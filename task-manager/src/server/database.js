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




// function to return collection in the db
function getLists() {
  try{
    const lists = List.find();
    return lists;

  } catch(e){
    console.error(e);
  }

}


// function for finding and expanding an exact list
function getListByID(id){
  try{
    const list = List.findById(id);
    return list;

  } catch(e){
    console.error(e);
  }
}

function getListByName(name){
  try{
    const list = List.find({name: name});
    const id = list._id;
    return id;

  } catch(e){
    console.error(e);
  }
}

// create new list
function createList(customListName){
  // grab the custom list name
  const customListName = _.capitalize(customListName);

  // check is list already exists
  List.findOne({name: customListName}).then((foundList) =>{
      if(!foundList){
          // create the new list
          const list = new List({
              name: customListName,
              items: []
          });
      
          // save the new list
          list.save();

          // return back ID to list
          return list._id;
      }
      // otherwise assume already exists
      else{
        // return ID of existing list
        return getListByName(customListName);
      }

  }).catch((err) =>{
      console.log(err);
  })

};



// function for adding an item to a list
function addToList(listID, name, dueDate, priority, user){
   const list = getListByID(listID);
   list.items.push({name: name, dueDate: dueDate, priority: priority, User: user });
   list.save();
}

// function to close the connection to the db
function closeConnection(){
  mongoose.close();
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export {getLists, getListByID, createList, addToList};