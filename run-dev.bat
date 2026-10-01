@echo off
echo ========================================================
echo   GearShare ⚡ Peer-to-Peer Gadget Rental Platform
echo ========================================================
echo.
echo Starting Backend REST API on http://localhost:5002 ...
start "GearShare Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend on http://localhost:3001 ...
start "GearShare Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Both services are starting!
echo   - Backend:  http://localhost:5002
echo   - Frontend: http://localhost:3001
echo ========================================================
echo.
pause
