// Global error handling middleware

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(err.stack);
  
  // Determine error status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;