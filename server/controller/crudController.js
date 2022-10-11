const Crud = require("../model/crudModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.create = catchAsync(async (req, res, next) => {
  const crud = await Crud.create(req.body);

  res.status(200).json({
    status: "success",
    data: crud,
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const crud = await Crud.find();
  res.status(200).json({
    status: "success",
    result: crud.length,
    data: crud,
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  const crud = await Crud.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: crud,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const crud = await Crud.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!crud) return next(new AppError("No document found in this!", 404));
  res.status(200).json({
    status: "success",
    data: crud,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const crud = await Crud.findByIdAndDelete(req.params.id);
  if (!crud) {
    return next(new AppError("No documents found in this is", 404));
  }
  res.status(204).json({
    status: "success",
    data: crud,
  });
});
