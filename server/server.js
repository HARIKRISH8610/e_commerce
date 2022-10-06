const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("uncaughtException:💥server closed");
  process.exit(1);
});

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully!!!");
  });

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is running at a port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("unhandledRejection:💥server is closed");
  server.close(() => {
    process.exit(1);
  });
});
