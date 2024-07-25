import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Filter_Box from "./FilterBox";
import Big_Box from "./BigBox";
import Nav_Bar from "./NavBar";

{
  /* this is the app file to get all of the components together. 
The only things that have changed from the worksheet 7 are I added some 
extra jsx elements
*/
}

function App() {
  const [notes, setNotes] = useState([]);

  function new_note(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function bad_note(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <Filter_Box />
      <Big_Box />
      
      <Nav_Bar />
      <CreateArea onAdd={new_note} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={bad_note}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
