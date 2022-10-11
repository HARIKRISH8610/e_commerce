const express = require("express");

const userController = require("../controller/userController");
const authController = require("../controller/authContoller");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetToken);

router
  .route("/")
  .get(
    authController.authorization,
    authController.protectFrom(["user", "lead"]),
    userController.getUsers
  );

router
  .route("/:id")
  .get(
    authController.authorization,
    authController.protectFrom(["user", "lead"]),
    userController.getOneUser
  );

module.exports = router;
