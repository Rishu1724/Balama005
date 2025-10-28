@echo off
echo AURA Unified Marketplace - Starting All Services
echo ===============================================

echo.
echo Starting all services sequentially...
echo.

cd /d "c:\Users\rishu\OneDrive\Desktop\Balama\aura-marketplace\server"
echo 1. Backend Server (Node.js) starting on port 5000...
npm run dev