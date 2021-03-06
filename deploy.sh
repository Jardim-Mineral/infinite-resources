#!/bin/bash

git remote add mn git@github.com:marinagem-www/infinitum.marinagem.com.git
git remote add th git@github.com:thiagohersan-www/infinitum.thiagohersan.com.git
git checkout --orphan gh-pages
git rm --cached -r . &> /dev/null
echo "infinitum.marinagem.com" > CNAME
git add assets/ css/ js/ index.html CNAME
git commit -m "updates sites" &> /dev/null
git push mn :gh-pages
git push th :gh-pages
git push mn gh-pages
echo "infinitum.thiagohersan.com" > CNAME
sed -i -e 's/infinitum.marinagem.com/infinitum.thiagohersan.com/g' index.html
git add CNAME index.html
git commit -m "updates sites" &> /dev/null
git push th gh-pages
