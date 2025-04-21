const errorHandler = (err, req, res, next) => {
    console.error('Error 💥:', err);
  
    // Use default status code of 500 if it's not set in the error object
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send error response to the client
    res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Show stack trace only in non-production environments
    });
  };
  
  module.exports = errorHandler;
  