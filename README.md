## Git-kommandoer
#### Før man begynner å jobbe med prosjektet bruk kommando:
``` 
$ git pull
```

#### Etter at man har gjort endringer:
```
$ git add --all
$ git commit -m "melding"
```
Den første kommandoen legger til alle nye filer

I den andre meldingen forteller "melding" hva slags endringer du har gjort

#### Last opp endringer til github:
```
$ git push origin main
```

#### Last opp egne lokale endringer til ny branch
```
git checkout -b <ny-branch-navn>
git add --all
git commit -m "melding"
git push origin <ny-branch-navn>
```
Dette oppretter en ny branch (med navnet `<ny-branch-navn>`), 
og laster opp endringene til denne branchen på GitHub.

Når du er ferdig kan du bytte tilbake til main og slette 
den midlertidige branchen lokalt med følgende kommando:
```
$ git switch main
$ git branch -d <branch_name>
```
