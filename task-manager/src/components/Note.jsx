import React from "react";
import axios from "axios";

// function to add a note box for lists and items
function Note(props) {

  // function to handle the delete button
  function onDelete(id) {
    // if we are deleting a list
    if(props.isList){
      // Call the backend to delete the list
      axios.post('http://localhost:3001/deleteListByName', { name: props.title })
      .then(response => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch(error => {
        console.error('There was an error deleting the list!', error);
      });
    }

    // otherwise assume item deletion
    else{
      // Call the backend to delete the item from the list
      axios.post('http://localhost:3001/deleteItem', {
        listId: props.listId, 
        itemName: props.title
      })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
    }
      
    // reload current page to update  
    window.location.reload();
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={onDelete}>
        {props.isList ? "Delete List" : "Delete Item"}
      </button>
    </div>
  );
}

export default Note;
