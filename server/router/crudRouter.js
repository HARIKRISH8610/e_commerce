const express = require("express");
const crudController = require("../controller/crudController");

const router = express.Router();

router.route("/").get(crudController.getAll).post(crudController.create);

router
  .route("/:id")
  .get(crudController.getOne)
  .patch(crudController.update)
  .delete(crudController.delete);

module.exports = router;
