const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sentMail = require("../utils/email");

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
  const checkUserChangedPassword = currentUser.changedPasswordToken(decode.iat);
  if (!checkUserChangedPassword)
    return next(
      new AppError(
        "Currently password is changed! You need to login again",
        401
      )
    );

  next();
});

exports.protectFrom = (role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role))
      return next(
        new AppError("This user has not permission to perform this action", 403)
      );
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new AppError("Email is not to be empty!", 400));

  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Their is user with this email", 404));

  const resetToken = await user.passwordResetTokenCreate();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? reset your in patch method with new password and confrimPassword at an api url ${resetUrl} .\nIf you didn't forgot your password please ignore this email.`;
  try {
    sentMail({ text: message, subject: "Reset token URL", to: user.email });
    res.status(200).json({
      status: "success",
      message: "Your reset token URL is send to your mail",
    });
  } catch (err) {
    user.passwordToken = undefined;
    user.passwordTokenExpiredAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error in sending a mail", 500));
  }
});

exports.resetToken = catchAsync(async (req, res, next) => {
  const resetTokens = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordToken: resetTokens,
    passwordTokenExpiredAt: { $gt: Date.now() },
  });
  if (!user)
    return next(
      new AppError("Your token is expired! Please new token again", 400)
    );

  user.password = req.body.password;
  user.confrimPassword = req.body.confrimPassword;
  user.passwordToken = undefined;
  user.passwordTokenExpiredAt = undefined;
  await user.save();
  createSendToken(user, 200, res);
});
