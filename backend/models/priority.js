let mongoose = require("mongoose");

let prioritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const priorityModel = mongoose.model("Priority", prioritySchema);

module.exports = priorityModel;
