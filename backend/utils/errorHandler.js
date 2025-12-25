// Error handling utility
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (error, res) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      success: false
    });
  }

  // Database errors
  if (error.code === '23505') {
    return res.status(400).json({
      error: 'This record already exists',
      success: false
    });
  }

  if (error.code === '23503') {
    return res.status(404).json({
      error: 'Referenced record not found',
      success: false
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error',
    success: false
  });
};

module.exports = {
  AppError,
  handleError
};
