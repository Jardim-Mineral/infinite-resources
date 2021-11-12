import * as THREE from './three/three.module.js';
import { Gui } from './Gui.js';
import { Scroll } from './Scroll.js';

const CAM_FOV = 150;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(CAM_FOV, window.innerWidth / window.innerHeight, 1, 150);
const renderer = new THREE.WebGLRenderer({ antialias: true });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  const cam_z = (window.innerHeight / 2) / Math.tan(CAM_FOV / 2 * Math.PI / 180);
  camera.position.set(0, 0, cam_z);
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

let mScroll;
window.addEventListener('DOMContentLoaded', () => {
  // THREEJS
  scene.background = new THREE.Color(0xffffff);
  scene.position.set(-window.innerWidth / 2, 0);
  const cam_z = (window.innerHeight / 2) / Math.tan(CAM_FOV / 2 * Math.PI / 180);
  camera.position.set(0, 0, cam_z);
  renderer.domElement.classList.add('my-canvas');
  document.getElementById('my-container').appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // SCROLL
  mScrollDiv.style.height = `${15 * window.innerHeight}px`;
  setTimeout(centerScroll, 500);

  mScroll = new Scroll(scene);
  new Gui({ scene, camera, renderer });

  setTimeout(() => renderer.render(scene, camera), 500);
});

let previousScrollTop = 0;
let previousScrollTimeout;
const mScrollDiv = document.getElementById('my-scroll-div');

function getScrollTopPosition() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function centerScroll() {
  const mScrollDiv = document.getElementById('my-scroll-div');

  const centerTop = (mScrollDiv.offsetHeight - window.innerHeight) / 2;

  window.removeEventListener('scroll', onScroll);
  window.scrollTo(0, centerTop);
  setTimeout(() => previousScrollTop = getScrollTopPosition(), 10);
  setTimeout(() => window.addEventListener('scroll', onScroll), 20);
}

const onScroll = (event) => {
  const currentScrollTop = getScrollTopPosition();
  const deltaY = currentScrollTop - previousScrollTop;
  previousScrollTop = currentScrollTop;

  if (currentScrollTop < (2 * window.innerHeight) ||
      currentScrollTop > (13 * window.innerHeight)) {
    clearTimeout(previousScrollTimeout);
    centerScroll();
  } else {
    clearTimeout(previousScrollTimeout);
    previousScrollTimeout = setTimeout(centerScroll, 2000);
  }

  scene.position.setY(Math.max(0, scene.position.y + deltaY));
  mScroll.update(scene.position.y);

  renderer.render(scene, camera);
};
