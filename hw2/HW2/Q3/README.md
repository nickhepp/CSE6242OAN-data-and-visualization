
## Creat venv

`python -m venv .venv`

## Run locally

From this folder, activate the virtual environment and start the local web server in PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
python -m http.server 8083
```

Open [http://localhost:8083/Q3.html](http://localhost:8083/Q3.html) in Chrome. Press `Ctrl+C` in the terminal to stop the server.