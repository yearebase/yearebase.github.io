.\scripts\clean.ps1
npm run build
npm run compile-sass

git add .
git commit
git push

Set-Location .\built
git add .
git commit -m "."
git push
