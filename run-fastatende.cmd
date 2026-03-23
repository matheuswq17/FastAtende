@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)

set PORT=3005
echo FastAtende iniciando. Porta preferencial: http://localhost:%PORT%
echo Se a porta %PORT% estiver ocupada, o sistema tentara a proxima automaticamente.
node server.js --port %PORT%
