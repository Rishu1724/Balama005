const { spawn, exec } = require('child_process');
const path = require('path');

console.log('AURA Unified Marketplace - Starting All Services');
console.log('===============================================');

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}` 
      : `lsof -i :${port}`;
      
    exec(command, (error, stdout) => {
      resolve(!error && stdout.length > 0);
    });
  });
}

// Function to kill process on a port (Windows only)
function killPort(port) {
  return new Promise((resolve) => {
    const command = `netstat -ano | findstr :${port}`;
    
    exec(command, (error, stdout) => {
      if (error || stdout.length === 0) {
        resolve(false);
        return;
      }
      
      const lines = stdout.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[4];
          console.log(`Killing process ${pid} on port ${port}`);
          exec(`taskkill /F /PID ${pid}`, (killError) => {
            if (killError) {
              console.log(`Failed to kill process on port ${port}: ${killError.message}`);
            }
            resolve(!killError);
          });
          return;
        }
      }
      resolve(false);
    });
  });
}

// Function to start a service
function startService(name, command, cwd, port) {
  return new Promise(async (resolve) => {
    console.log(`\n[${name}] Checking port ${port}...`);
    
    // Check if port is already in use
    const inUse = await isPortInUse(port);
    if (inUse) {
      console.log(`[${name}] Port ${port} is in use. Attempting to free it...`);
      await killPort(port);
      // Wait a moment for the port to be freed
      await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log(`[${name}] Starting service...`);
    
    const [cmd, ...args] = command.split(' ');
    const service = spawn(cmd, args, { cwd, shell: true });
    
    service.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        console.log(`[${name}] ${output}`);
      }
    });
    
    service.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        console.log(`[${name} ERROR] ${output}`);
      }
    });
    
    service.on('close', (code) => {
      console.log(`[${name}] Process exited with code ${code}`);
    });
    
    // Give some time for the service to start
    setTimeout(() => {
      resolve(service);
    }, 3000);
  });
}

// Main async function
async function startAllServices() {
  try {
    console.log('Starting all services...\n');
    
    // Start Backend Server (Node.js) on port 5000
    const backend = await startService(
      'Backend Server', 
      'npm run dev', 
      path.join(__dirname, 'aura-marketplace', 'server'),
      5000
    );
    
    // Wait a bit for backend to start
    await new Promise(r => setTimeout(r, 5000));
    
    // Start ML Service (Python Flask) on port 5002
    const mlService = await startService(
      'ML Service', 
      'python ml_service.py', 
      path.join(__dirname, 'aura-marketplace', 'python_ml'),
      5002
    );
    
    // Wait a bit for ML service to start
    await new Promise(r => setTimeout(r, 5000));
    
    // Start Frontend (Python HTTP server) on port 8000
    const frontend = await startService(
      'Frontend', 
      'python -m http.server 8000', 
      path.join(__dirname, 'aura-marketplace', 'client', 'dist'),
      8000
    );
    
    console.log('\n✅ All services started successfully!');
    console.log('\n🔗 Access the application at: http://localhost:8000');
    console.log('🔗 Backend API at: http://localhost:5000');
    console.log('🔗 ML Service at: http://localhost:5002');
    
    console.log('\nPress Ctrl+C to stop all services');
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down all services...');
      try {
        backend.kill();
      } catch (e) {
        console.log('[Backend] Already stopped');
      }
      
      try {
        mlService.kill();
      } catch (e) {
        console.log('[ML Service] Already stopped');
      }
      
      try {
        frontend.kill();
      } catch (e) {
        console.log('[Frontend] Already stopped');
      }
      
      console.log('👋 All services stopped. Goodbye!');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error starting services:', error.message);
    process.exit(1);
  }
}

// Run the main function
startAllServices();