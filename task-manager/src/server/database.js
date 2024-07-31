const express = require('express');
const mongoose = require('mongoose');
const Task = require('Items.js');
const List = require('List.js');



const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//default items

const defaultItems = [
  {
    name: "Emails",
    dueDate: new Date(), // Set the current date
    priority: "High",
    User: "Max"
  },
  {
    name: "Morning Meeting",
    dueDate: new Date(), // Set the current date
    priority: "Medium",
    User: "Gabriela"
  }
];
//get all lists
async function getLists() {
  try {
    const lists = await List.find({});
    return lists;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
}

// Get a list by ID
async function getListById(id) {
  try {
    const list = await List.findById(id);
    return list;
  } catch (error) {
    console.error('Error fetching list by ID:', error);
    throw error;
  }
}

// Get a list by name
async function getListByName(name) {
  try {
    const list = await List.findOne({ name: name });
    return list;
  } catch (error) {
    console.error('Error fetching list by name:', error);
    throw error;
  }
}


// create new list
async function createList(name) {
  try {
    // Check if the list already exists
    const existingList = await List.findOne({ name: name });
    if (existingList) {
      return existingList._id; // Return the ID of the existing list
    }

    // Create a new list if it doesn't exist
    const newList = new List({
      name: name,
      items: [defaultItems] 
    });

    await newList.save();
    return newList._id; // Return the ID of the new list
  } catch (error) {
    console.error("Error creating list:", error);
    return null;
  }
}




// function for adding an item to a list
function addToList(listID, name, dueDate, priority, user){
   const list = getListByID(listID);
   list.items.push({name: name, dueDate: dueDate, priority: priority, User: user });
   list.save();
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = {
  getLists,
  getListById,
  getListByName,
  createList,
  addToList
};