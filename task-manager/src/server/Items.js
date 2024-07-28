const mongoose = require('mongoose');

// Define Task Schema and Model
const taskSchema = new mongoose.Schema({
    name: String,
    dueDate: Date,
    priority: String,
    User: String,
  });
  
// for creating a new list
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;