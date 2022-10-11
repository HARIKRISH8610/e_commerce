const AppError = require("../utils/AppError");

const validationError = (err, res, next) => {
  let error = [];
  for (field in err.errors) {
    console.log(error);
    error.push(err.errors[field].message);
  }
  res.status(400).json({
    status: "failed",
    error: error,
  });
  // return next(new AppError(error, 400));
};
const allerrors = (err, res) => {
  res.status(err.statusCode).json({
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

const duplicateDevError = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `This ${Object.keys(err.keyValue)} is already exist.`,
    error: err,
  });
};
const duplicateProdError = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `This ${Object.keys(err.keyValue)} is already exist.`,
  });
};
const castDevError = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `${err.value} is not a valid objectId`,
    error: err,
  });
};
const castProdError = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `${err.value} is not a valid objectId`,
  });
};
const allProdError = (err, res) => {
  res.status(err.statusCode).json({
    status: "error",
    error: err.errorMessage,
  });
};
const JsonWebTokenError = (err, res) => {
  res.status(403).json({
    status: "failed",
    error: "Your token is invalid ! please login again",
  });
};
const TokenExpiredError = (err, res) => {
  res.status(401).json({
    status: "failed",
    error: "Your token is expired ! please login again",
  });
};
module.exports = (err, req, res, next) => {
  const error = { ...err };
  console.log("errorcontroller", error);
  if (process.env.NODE_ENV === "development") {
    if (err._message.endsWith("validation failed"))
      return validationError(error, res, next);
    if (err.code === 11000) return duplicateDevError(error, res);
    if (err.name === "CastError") return castDevError(error, res);
    if (err.name === "JsonWebTokenError") return JsonWebTokenError(error, res);
    if (err.name === "TokenExpiredError") return TokenExpiredError(error, res);

    allerrors(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err._message.endsWith("validation failed"))
      error = validationError(error, res);
    if (error.isOperational === true) return operationalError(error, res);
    if (err.code === 11000) return duplicateProdError(error, res);
    if (err.name === "CastError") return castProdError(error, res);
    if (err.name === "JsonWebTokenError") return JsonWebTokenError(error, res);
    if (err.name === "TokenExpiredError") return TokenExpiredError(error, res);

    allProdError(err, res);
  }
};
