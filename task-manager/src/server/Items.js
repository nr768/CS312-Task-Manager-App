const mongoose = require('mongoose');

// Define Task Schema and Model
const itemSchema = new mongoose.Schema({
    name: String,
    dueDate: Date,
    priority: String,
    User: String,
  });
  
// for creating a new list
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;