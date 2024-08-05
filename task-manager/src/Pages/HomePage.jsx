import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import Filter_Box from "../components/FilterBox";
import Big_Box from "../components/BigBox";
import Nav_Bar from "../components/NavBar";
import Add_button from "../components/AddButtons";
import ListDisplay from "../components/ListDisplay";
// import axios from "axios";

function HomePage(){
  const [notes, setNotes] = useState([]);

  function new_note(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  return (
    <div>
      <Header title ={"Dashboard (homepage)"}/>
      <Filter_Box />
      <Big_Box />
      <ListDisplay></ListDisplay>
      <Nav_Bar />
      <Add_button onAdd={new_note}/>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            isList={true} // This note is representing a list
            content={noteItem.content}
            
          />
        );
      })}
      <Footer />
    </div>
  );

}

export default HomePage;