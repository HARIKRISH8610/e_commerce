const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const limiter = require("express-rate-limit");

const userRouter = require("./router/userRouter");
const crudRouter = require("./router/crudRouter");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

//limiter
const limiters = limiter.rateLimit({
  max: 100,
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  windowMs: 24 * 60 * 60 * 1000,
});
app.use("/api", limiters);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/crud", crudRouter);

//global error handler
app.use(globalErrorHandler);

module.exports = app;
