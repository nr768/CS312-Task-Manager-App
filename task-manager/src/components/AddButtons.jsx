import React, { useState }from "react";

function Add_button(props) {
  
  function todays_date(){

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  
  const [note, make_note] = useState({
    title: "",
    content: "",
  });

  function doChange(event) {
    const { name, value } = event.target;

    make_note((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }


  function submit_note(event) {
    // this variable will set the content (duedate) in the note box
    const updatedNote = {
      // use the note
      ...note,

      title: note.title.trim() === "" ? "New List" : note.title,

      // if the date box was empty then set to todays date otherwise set to 
      //  whatever was in the due date input box
      content: note.content.trim() === "" ? todays_date() : note.content,
    };

    props.onAdd(updatedNote);

    make_note({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
    return (
      <div className="submit_boxes">
        <button type="submit" onClick={submit_note}>Add New List button</button>
        <input
          name="title"
          onChange={doChange}
          value={note.title}
          placeholder="List Name "
        />
        <textarea
          
          name="content"
          onChange={doChange}
          value={note.content}
          placeholder= {todays_date()}
          rows="3"
        />
        <button >Overview</button>
      </div>
    );
  }
  
  export default Add_button;