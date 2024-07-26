import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Filter_Box from "../components/FilterBox";
import Big_Box from "../components/BigBox";
import Nav_Bar from "../components/NavBar";

function ListPage(){
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
        <Header title ={"List 1"}/>
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


export default ListPage;