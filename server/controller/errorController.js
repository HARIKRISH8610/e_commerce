const validationError = (err, res) => {
  res.status(400).json({
    status: "failed",
    error: err.errors,
  });
};
const allerrors = (err, res) => {
  res.status(500).json({
    status: "error",
    error: err,
  });
};

const operationalError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.errorMessage,
  });
};

module.exports = (err, req, res, next) => {
  const error = { ...err };
  if (process.env.NODE_ENV === "development") {
    if (err._message === "User validation failed") validationError(error, res);
    allerrors(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.isOperational === true) operationalError(error, res);
    next();
  }
};
