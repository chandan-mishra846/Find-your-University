// Response formatting utility
const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

const errorResponse = (error, statusCode = 400) => {
  return {
    success: false,
    error,
    statusCode
  };
};

const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data
  });
};

module.exports = {
  successResponse,
  errorResponse,
  sendResponse
};
