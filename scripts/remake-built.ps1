if (!(Test-Path .\built)) {
    New-Item -Type Directory .\built
    
    Push-Location .\built
    git init
    git branch -m built
    git remote add origin $(Push-Location ..; git remote get-url origin; Pop-Location)
    git pull origin built
    Pop-Location
}
