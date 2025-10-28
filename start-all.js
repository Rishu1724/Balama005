const { spawn } = require('child_process');
const path = require('path');

console.log('AURA Unified Marketplace - Starting All Services');
console.log('===============================================');

// Function to start a service
function startService(name, command, cwd, port) {
  console.log(`\nStarting ${name} on port ${port}...`);
  
  const [cmd, ...args] = command.split(' ');
  const service = spawn(cmd, args, { cwd, shell: true });
  
  service.stdout.on('data', (data) => {
    console.log(`[${name}] ${data}`);
  });
  
  service.stderr.on('data', (data) => {
    console.log(`[${name} ERROR] ${data}`);
  });
  
  service.on('close', (code) => {
    console.log(`[${name}] process exited with code ${code}`);
  });
  
  return service;
}

// Start Backend Server (Node.js) on port 5000
const backend = startService(
  'Backend Server', 
  'npm run dev', 
  path.join(__dirname, 'aura-marketplace', 'server'),
  5000
);

// Start ML Service (Python Flask) on port 5002
const mlService = startService(
  'ML Service', 
  'python ml_service.py', 
  path.join(__dirname, 'aura-marketplace', 'python_ml'),
  5002
);

// Start Frontend (Python HTTP server) on port 8000
const frontend = startService(
  'Frontend', 
  'python -m http.server 8000', 
  path.join(__dirname, 'aura-marketplace', 'client', 'dist'),
  8000
);

console.log('\nAll services started successfully!');
console.log('\nAccess the application at: http://localhost:8000');
console.log('Backend API at: http://localhost:5000');
console.log('ML Service at: http://localhost:5002');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down all services...');
  backend.kill();
  mlService.kill();
  frontend.kill();
  process.exit(0);
});