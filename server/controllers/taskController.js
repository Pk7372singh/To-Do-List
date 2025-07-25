const Task = require("../models/Task");
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Could not create task" });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { collaborators: req.user.id }
      ]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch tasks" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Could not update task" });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete task" });
  }
};
