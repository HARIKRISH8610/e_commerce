const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require("./router/userRouter");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

//global error handler
app.use(globalErrorHandler);

module.exports = app;
