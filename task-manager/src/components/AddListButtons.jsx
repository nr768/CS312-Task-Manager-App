import React, { useState } from "react";
import axios from 'axios';
import Popup from 'reactjs-popup';

function AddListButton(props) {
  const {listId} = props;

  // function to get todays date for default due date
  function todays_date() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  // object we will be creating in the db
  const [note, setNote] = useState({
    title: "",
    dueDate: "",
    priority: "",
    User: "",
  });

  // function to update the objects
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  // function to add a new item when button is clicked
  function handleSubmit(event) {
    event.preventDefault(); 

    // will add users items if filled in
    // will add default values if left blank
    const updatedNote = {
      title: note.title.trim() === "" ? "New Item" : note.title,
      dueDate: note.dueDate.trim() === "" ? todays_date() : note.content,
      priority: note.priority.trim() === "" ? "low" : note.priority,
      User: note.User.trim() === "" ? "NA" : note.User,
    };
  
    // add to the objects
    if (props.onAdd) {
      props.onAdd(updatedNote);
    }

    // Clear the form
    setNote({
      title: "",
      dueDate: "",
      priority: "",
      User: "",
    });

    // Send the request to create a new list
    axios.post('http://localhost:3001/addItem', {
      listId: listId,
      name: updatedNote.title,
      dueDate: updatedNote.dueDate,
      priority: updatedNote.priority,
      user: updatedNote.User,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error creating the list!', error);
    });
    
    // reload window to show new items
    window.location.reload();
  }
// the last big div is the overview button. it makes a popup appear with all of the overview stuff we need 
  return (
    <div className="submit_boxes">
      <button type="submit" onClick={handleSubmit}>Add New Item</button>
      <input
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="List Name"
      />
      <textarea
        name="dueDate"
        onChange={handleChange}
        value={note.dueDate}
        placeholder="List Due Date:"
      />
      <input
        name="priority"
        onChange={handleChange}
        value={note.priority}
        placeholder="Priority"
      />
      <input
        name="User"
        onChange={handleChange}
        value={note.user}
        placeholder="User"
      />
      <div>
      <Popup trigger=
        {<button> Overview </button>} 
          modal nested>
            {
              close => (
                <div className='modal'>
                  <div className='overview_content'>
                    Num tasks assigned: <br></br>
                    Num tasks completed: <br></br>
                    Num tasks overdue: <br></br>
                     </div>
                     <div>
                        <button onClick=
                          {() => close()}>
                            Close overview
                        </button>
                      </div>
                      </div>
                    )
                }
            </Popup>
      </div>
    </div>
  );
}

export default AddListButton;
