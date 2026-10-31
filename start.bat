@echo off
echo =========================================================
echo    Starting SENTINEL Disaster Intelligence Services
echo =========================================================
echo.
echo [1/2] Launching Python FastAPI Backend on http://localhost:8000 ...
start "SENTINEL Python Backend (Port 8000)" cmd /k python backend\run.py
timeout /t 2 >nul
echo.
echo [2/2] Launching React + Vite Frontend on http://localhost:3000 ...
start "SENTINEL Frontend (Port 3000)" cmd /k npm run dev
echo.
echo =========================================================
echo    All services launched!
echo    Access URL: http://localhost:3000/
echo    Media Authenticity: http://localhost:3000/media-authenticity
echo =========================================================

