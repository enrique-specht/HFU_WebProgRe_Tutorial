const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const initDatabaseConnection = require("./dbConnection.js");

const app = express();

const Task = require("./models/task");
const Priority = require("./models/priority");
const User = require("./models/user");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//default port if an error occurred
let port = 3100;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

initDatabaseConnection(process.argv[2]);

require("./session/session")(app);
const verifyToken = require("./session/verifyToken");

app.get("/tasks", verifyToken, async function (req, res) {
  try {
    let tasks = await Task.find({ user: req.user.id }).populate("priority");
    res.status(200).send(tasks);
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.get("/priorities", verifyToken, async function (req, res) {
  try {
    let priorities = await Priority.find();
    res.status(200).send(priorities);
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.post("/task", verifyToken, async function (req, res) {
  try {
    let newTask = req.body;
    newTask.user = req.user.id;
    newTask.completed = false;

    let task = new Task(newTask);
    task.save((err) => {
      if (err) {
        res.status(422).send("Data are not correct!");
      } else {
        res.status(201).send("successfully added!");
      }
    });
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.post("/priority", verifyToken, async function (req, res) {
  try {
    let newPriority = req.body;
    newPriority.user = req.user.id;
    let priority = new Priority(newPriority);
    priority.save((err) => {
      if (err) {
        res.status(422).send("Data are not correct!");
      } else {
        res.status(201).send("successfully added!");
      }
    });
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.put("/task", verifyToken, async function (req, res) {
  try {
    let id = req.body._id;
    let task = { ...req.body };
    let tasks = await Task.updateOne(
      { _id: id, user: req.user.id },
      { task: task.task, priority: task.priority, completed: task.completed }
    );
    if (tasks.nModified == 1) {
      res.status(201).send("successfully updated!");
    } else {
      res.status(422).send("something did go wrong while updating");
    }
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.put("/priority", verifyToken, async function (req, res) {
  try {
    let id = req.body.id;

    let priority = await Priority.updateOne(
      { _id: id, user: req.user.id },
      { name: req.body.name }
    );
    if (priority.nModified == 1) {
      res.status(201).send("successfully updated!");
    } else {
      res.status(422).send("something did go wrong while updating");
    }
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.delete("/task/:id", verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    const returnValue = await Task.deleteOne({ _id: id, user: req.user.id });
    if (returnValue.deletedCount == 1) {
      res.status(201).send("successfully deleted!");
    } else {
      res.status(422).send("something did go wrong while deleting");
    }
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.delete("/priority/:id", verifyToken, async function (req, res) {
  try {
    let id = req.params.id;

    const returnValue = await Priority.deleteOne({
      _id: id,
      user: req.user.id,
    });
    if (returnValue.deletedCount == 1) {
      res.status(201).send("successfully deleted!");
    } else {
      res.status(422).send("something did go wrong while deleting");
    }
  } catch (err) {
    let errorObj = { body: req.body, errorMessage: "Server error!" };
    res.status(500).send(errorObj);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
