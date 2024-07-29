import React, { useState }from "react";

function Add_button(props) {
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
    props.onAdd(note);
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
          placeholder="List Due Date"
          rows="3"
        />
        <button >Overview</button>
      </div>
    );
  }
  
  export default Add_button;