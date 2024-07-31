const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors()); 

// NOTE!!!: make sure to start this script in order for the front end to work
// go to the server directory and do: nodemon database.js

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Task Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  priority: String,
  User: String,
});

const Item = mongoose.model('Item', itemSchema);

// Define List Schema and Model
const listSchema = new mongoose.Schema({
  name: String,
  dueDate: String,
  items: [itemSchema]
});

const List = mongoose.model("List", listSchema);

// Default items
const defaultItems = [
  {
    name: "Emails",
    dueDate: new Date(),
    priority: "High",
    User: "Max"
  },
  {
    name: "Morning Meeting",
    dueDate: new Date(),
    priority: "Medium",
    User: "Gabriela"
  }
];







// Add an item to a list
async function addToList(listID, name, dueDate, priority, user) {
  try {
    const list = await getListById(listID);
    if (!list) {
      throw new Error('List not found');
    }
    list.items.push({ name, dueDate, priority, User: user });
    await list.save();
  } catch (error) {
    console.error('Error adding item to list:', error);
    throw error;
  }
}


// Get all lists old function
// async function getLists() {
//   try {
//     const lists = await List.find({});
//     return lists;
//   } catch (error) {
//     console.error('Error fetching lists:', error);
//     throw error;
//   }
// }

app.post('/getLists', async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lists' });
  }
});


// Create a new list
// async function createList(name) {
//   try {
//     const existingList = await List.findOne({ name: name });
//     if (existingList) {
//       return existingList._id;
//     }

//     const newList = new List({
//       name: name,
//       items: defaultItems 
//     });

//     await newList.save();
//     return newList._id;
//   } catch (error) {
//     console.error("Error creating list:", error);
//     return null;
//   }
// }

// Create a new list route
// Create list route
app.post('/createList', async (req, res) => {
  const { name, dueDate } = req.body;
  try {
    const existingList = await List.findOne({ name });
    if (existingList) {
      // return res.status(200).send({ message: 'List already exists', listId: existingList._id });
      return;
    }

    
    const newList = new List({
      name,
      dueDate,
      // Initialize with an empty array
      items: defaultItems 
    });

    await newList.save();
    // res.status(201).send({ message: 'List created', listId: newList._id });
  } catch (error) {
    // res.status(500).send({ message: 'Error creating list', error: error.message });
  }
});

// Add an item to a list route
app.post('/add-item', async (req, res) => {
  const { listID, name, dueDate, priority, user } = req.body;
  try {
    await addToList(listID, name, dueDate, priority, user);
    res.status(200).send({ message: 'Item added' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding item', error });
  }
});


// Get a list by ID
// async function getListById(id) {
//   try {
//     const list = await List.findById(id);
//     return list;
//   } catch (error) {
//     console.error('Error fetching list by ID:', error);
//     throw error;
//   }
// }

app.post('/getListById', async (req, res) => {
  const { id } = req.body; // Destructure id directly
  try {
      // Ensure the id is a string
      if (!id) {
          return res.status(400).json({ message: 'ID is required' });
      }

      // Fetch the list by ID
      const list = await List.findById(id);
      if (list) {
          res.json(list);
      } else {
          res.status(404).json({ message: 'List not found' });
      }
  } catch (error) {
      console.error('Error fetching list by ID:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

