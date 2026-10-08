
## Creat venv

`python -m venv .venv`

## Run locally

From this folder, activate the virtual environment and start the local web server in PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
python -m http.server 8084
```

Open [http://localhost:8084/Q4.html](http://localhost:8083/Q4.html) in Chrome. Press `Ctrl+C` in the terminal to stop the server.