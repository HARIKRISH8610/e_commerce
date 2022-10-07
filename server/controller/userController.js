const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    result: user.length,
    data: user,
  });
});
exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError(
        `Their is no user found with this ID : ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   const user = await User.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: user,
//   });
// });
