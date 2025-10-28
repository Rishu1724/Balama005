Write-Host "AURA Unified Marketplace - Starting All Services"
Write-Host "==============================================="

# Start Backend Server (Node.js) on port 5000
Write-Host "`n1. Starting Backend Server (Node.js) on port 5000..."
Set-Location -Path "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowTitle "Backend Server"

# Start ML Service (Python Flask) on port 5002
Write-Host "`n2. Starting ML Service (Python Flask) on port 5002..."
Set-Location -Path "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\python_ml"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python ml_service.py" -WindowTitle "ML Service"

# Start Frontend (React) on port 8000
Write-Host "`n3. Starting Frontend (React) on port 8000..."
Set-Location -Path "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\client\dist"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m http.server 8000" -WindowTitle "Frontend"

Write-Host "`nAll services started successfully!"
Write-Host "`nAccess the application at: http://localhost:8000"
Write-Host "Backend API at: http://localhost:5000"
Write-Host "ML Service at: http://localhost:5002"

Write-Host "`nPress any key to exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")