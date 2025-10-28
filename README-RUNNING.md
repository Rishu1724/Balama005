# Running the AURA Unified Marketplace

This document explains how to run the complete AURA Unified Marketplace application with all its services.

## Prerequisites

Before running the application, ensure you have:
1. Node.js installed
2. Python installed
3. All dependencies installed (npm install in client and server directories)
4. Python dependencies installed (pip install -r requirements.txt in python_ml directory)

## Running All Services

You have several options to run all services at once:

### Option 1: Using the Robust Node.js Script (Recommended)

Run the following command from the root directory:

```bash
node start-all-robust.js
```

This will start all services in a single terminal window:
- Backend Server (Node.js) on port 5000
- ML Service (Python Flask) on port 5002
- Frontend (React) on port 8000

This script will also:
- Check if ports are already in use
- Automatically free up ports if needed
- Provide better error handling

To stop all services, press `Ctrl+C`.

### Option 2: Using the Original Node.js Script

Run the following command from the root directory:

```bash
node start-all.js
```

This will start all services in a single terminal window:
- Backend Server (Node.js) on port 5000
- ML Service (Python Flask) on port 5002
- Frontend (React) on port 8000

To stop all services, press `Ctrl+C`.

### Option 3: Using the PowerShell Script

Run the PowerShell script:

```powershell
.\run-full-website.ps1
```

This will open separate PowerShell windows for each service.

### Option 4: Using the Batch File

Run the batch file:

```cmd
run-full-website.bat
```

This will open separate Command Prompt windows for each service.

## Manual Commands

If you prefer to run services manually, use these commands in separate terminals:

1. **Backend Server**:
   ```bash
   cd aura-marketplace/server
   npm run dev
   ```

2. **ML Service**:
   ```bash
   cd aura-marketplace/python_ml
   python ml_service.py
   ```

3. **Frontend**:
   ```bash
   cd aura-marketplace/client/dist
   python -m http.server 8000
   ```

## Accessing the Application

Once all services are running:

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:5002

## Port Configuration

- Port 8000: Frontend (React application)
- Port 5000: Backend (Node.js server)
- Port 5002: ML Service (Python Flask)

## Troubleshooting

If you encounter port conflicts:

1. Identify the process using the port:
   ```cmd
   netstat -ano | findstr :<port>
   ```

2. Terminate the process:
   ```cmd
   taskkill /F /PID <PID>
   ```

For example, to kill a process using port 5000:
```cmd
netstat -ano | findstr :5000
taskkill /F /PID <PID_from_previous_command>
```

If services fail to start:
1. Check that all dependencies are installed
2. Ensure no other applications are using the required ports
3. Verify that the build process completed successfully for the frontend