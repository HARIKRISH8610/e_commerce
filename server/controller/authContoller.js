const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCRETE, {
    expiresIn: process.env.JWT_EXPRIES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user.id);

  let cookiesOption = {
    maxAge: process.env.JWT_COOKIE_EXPRIES * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  user.password = undefined;

  if (process.env.NODE_ENV === "production") cookiesOption.secure = true;
  res.cookie("jwt_token", token, cookiesOption);
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  req.user = user.id;

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password)
    return next(new AppError("Email and Password should not be empty", 400));

  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.checkLoginPassword(user.password, password))) {
    return next(new AppError("Email or Password is incorrect", 400));
  }
  req.user = user.id;

  createSendToken(user, 200, res);
});

exports.authorization = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(
      new AppError("You are not logged in! please login to get access!", 401)
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SCRETE);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(new AppError("This user is not belongs to this token!", 401));
  }
  req.user = currentUser;

  next();
});

exports.protectFrom = (role) => {
  return (req, res, next) => {
    console.log(role);
    console.log(req.user);
  };
};
