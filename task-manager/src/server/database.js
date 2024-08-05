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
async function addToList(listId, newItem) {
  try {
    const list = await List.findById(listId);
    if (!list) {
      throw new Error('List not found');
    }
    list.items.push(newItem);
    await list.save();
    return list;
  } catch (error) {
    console.error('Error adding item to list:', error);
    throw error;
  }
}

app.post('/getLists', async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lists' });
  }
});

// Create a new list route
// Create list route
app.post('/createList', async (req, res) => {
  const { name, dueDate } = req.body;
  try {
    const existingList = await List.findOne({ name });
    if (existingList) {
      return res.status(200).send({ message: 'List already exists', listId: existingList._id });
    }
    
    const newList = new List({
      name,
      dueDate,
      // Initialize with an empty array
      items: defaultItems 
    });

    await newList.save();
    res.status(201).send({ message: 'List created', listId: newList._id });
  } catch (error) {
    res.status(500).send({ message: 'Error creating list', error: error.message });
  }
});

// Add an item to a list route
app.post('/addItem', async (req, res) => {
  const { listId, name, dueDate, priority, user } = req.body;
  try {
    const newItem = { name, dueDate, priority, User: user };
    const updatedList = await addToList(listId, newItem);
    res.status(200).json({ message: 'Item added successfully', updatedList });
  } catch (error) {
    console.error('Error in add-item route:', error);
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
});

app.post('/getListById', async (req, res) => {
  const {id} = req.body; 
  try {
      // check if we have an id passed in
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


// Delete list route
// Delete list route by name
app.post('/deleteListByName', async (req, res) => {
  const { name } = req.body;
  try {
    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: 'List name is required' });
    }

    const result = await List.findOneAndDelete({ name });
    if (!result) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error in deleteListByName route:', error);
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
});

// Delete item route
app.post('/deleteItem', async (req, res) => {
  const { listId, itemName } = req.body;

  try {
    // Find the list by ID
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Find the index of the item with the matching name
    const itemIndex = list.items.findIndex(item => item.name === itemName);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Remove the item from the items array
    list.items.splice(itemIndex, 1);

    // Save the updated list
    await list.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Delete a list
// async function deleteList(listId) {
//   try {
//     const result = await List.findByIdAndDelete(listId);
//     if (!result) {
//       throw new Error('List not found');
//     }
//     return result;
//   } catch (error) {
//     console.error('Error deleting list:', error);
//     throw error;
//   }
// }

// // Delete an item from a list
// async function deleteItem(listId, itemId) {
//   try {
//     const list = await List.findById(listId);
//     if (!list) {
//       throw new Error('List not found');
//     }
//     list.items = list.items.filter(item => item._id.toString() !== itemId);
//     await list.save();
//     return list;
//   } catch (error) {
//     console.error('Error deleting item from list:', error);
//     throw error;
//   }
// }



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

// Delete list route
// async function deleteList(name) {
//   try {
//     const result = await List.findByNameAndDelete(name);
//     if (!result) {
//       throw new Error('List not found');
//     }
//     console.log(`List with ID ${listId} deleted.`);
//   } catch (error) {
//     console.error('Error deleting list:', error);
//     throw error;
//   }
// }