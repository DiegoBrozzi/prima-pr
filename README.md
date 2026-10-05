# prima-pr

Repository di prova per imparare il flusso di lavoro con Git e GitHub:
creare un branch, fare un commit e aprire una pull request.

## Come iniziare

Clona il repository ed entra nella cartella:

```bash
git clone https://github.com/DiegoBrozzi/prima-pr.git
cd prima-pr
```

Per proporre una modifica, crea un nuovo branch, fai un commit e apri una pull request:

```bash
git switch -c nome-del-branch
git add .
git commit -m "Descrizione della modifica"
git push -u origin nome-del-branch
gh pr create
```
