const express = require("express");

const userController = require("../controller/userController");
const authController = require("../controller/authContoller");

const router = express.Router();

router.route("/login").post(authController.login);

router
  .route("/")
  .get(authController.authorization, userController.getUsers)
  .post(authController.signUp);

router.route("/:id").get(userController.getOneUser);

module.exports = router;
