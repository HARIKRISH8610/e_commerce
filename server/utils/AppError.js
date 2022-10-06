class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    this.errorMessage = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
