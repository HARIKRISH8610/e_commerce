const express = require("express");

const userRouter = require("../controller/userController");

const router = express.Router();

router.route("/").get(userRouter.getUsers).post(userRouter.createUser);

router.route("/:id").get(userRouter.getOneUser);

module.exports = router;
