const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  place: {
    type: String,
    required: [true, "place is required"],
  },
  count: {
    type: Number,
    required: [true, "count is required"],
  },
});

const Crud = mongoose.model("Crud", crudSchema);

module.exports = Crud;
