@echo off
cd /d "%~dp0"
echo Starting Calyco application...

:: Start Backend
echo Starting Backend Server...
start "Calyco Server" cmd /k "npm run server"

:: Start Frontend
echo Starting Frontend...
start "Calyco Frontend" cmd /k "npm run dev"

:: Open Admin Page in Chrome
timeout /t 5
start chrome "http://localhost:5173/admin/magic-upload"

echo Application started!
echo backend running on http://localhost:5000 (usually)
echo frontend running on http://localhost:5173 (usually)
