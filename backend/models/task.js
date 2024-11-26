let mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Boolean, required: true },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
