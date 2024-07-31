import React, { useState } from "react";
import axios from 'axios';

function AddButton(props) {
  
  function todays_date() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const updatedNote = {
      title: note.title.trim() === "" ? "New List" : note.title,
      content: note.content.trim() === "" ? todays_date() : note.content,
    };

    // Call the parent function if needed
    if (props.onAdd) {
      props.onAdd(updatedNote);
    }

    // Clear the form
    setNote({
      title: "",
      content: "",
    });

    // Send the request to create a new list
    axios.post('http://localhost:3001/createList', {
      name: updatedNote.title,
      dueDate: updatedNote.content,
    })
    .then(response => {
      console.log(response.data);
      alert(response.data.message); // Display success or error message
    })
    .catch(error => {
      console.error('There was an error creating the list!', error);
    });
  }

  return (
    <div className="submit_boxes">
      <button type="submit" onClick={handleSubmit}>Add New List</button>
      <input
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="List Name"
      />
      <textarea
        name="content"
        onChange={handleChange}
        value={note.content}
        placeholder={todays_date()}
        rows="3"
      />
      <button>Overview</button>
    </div>
  );
}

export default AddButton;
