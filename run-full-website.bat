@echo off
echo AURA Unified Marketplace - Starting All Services
echo ===============================================

echo.
echo 1. Starting Backend Server (Node.js) on port 5000...
cd /d "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\server"
start "Backend Server" cmd /k "npm run dev"

echo.
echo 2. Starting ML Service (Python Flask) on port 5002...
cd /d "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\python_ml"
start "ML Service" cmd /k "python ml_service.py"

echo.
echo 3. Starting Frontend (React) on port 8000...
cd /d "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\client\dist"
start "Frontend" cmd /k "python -m http.server 8000"

echo.
echo All services started successfully!
echo.
echo Access the application at: http://localhost:8000
echo Backend API at: http://localhost:5000
echo ML Service at: http://localhost:5002
echo.
echo Press any key to exit...
pause >nul