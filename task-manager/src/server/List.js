const mongoose = require('mongoose');

// Define List Schema and Model
const listSchema = {
    name: String,
    items: [itemsSchema]
  };
  
// create the list
const List = mongoose.model("List", listSchema);


module.exports = List;