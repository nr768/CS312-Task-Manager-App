import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import Filter_Box from "../components/FilterBox";
import Big_Box from "../components/BigBox";
import Nav_Bar from "../components/NavBar";
import Add_List_Button from "../components/AddListButtons";

function List_Page(props) {
    const [notes, setNotes] = useState([]);
    const {id, name} = props; 

    useEffect(() => {
        // Fetch list data from backend by ID
        axios.post('http://localhost:3001/getListById', { id: id }) 
            .then(response => {
                setNotes(response.data.items || []);
            })
            .catch(error => {
                console.error('Error fetching list data:', error);
            });
    }, [id]);

    function new_note(note) {
        setNotes((prevNotes) => [...prevNotes, note]);
    }

    return (
        <div>
            <Header title={`${name}`} />
            <Filter_Box />
            <Big_Box />
            <Nav_Bar />
            <Add_List_Button onAdd={new_note} listId={id}/>
            {notes.map((noteItem, index) => (
                <Note
                    key={index}
                    id={index}
                    listId={id}
                    title={noteItem.name}
                    isList={false} 
                    content={`Due: ${new Date(noteItem.dueDate).toLocaleDateString()} \nPriority: ${noteItem.priority} \nUser: ${noteItem.User}`}
                />
            ))}
            <Footer />
        </div>
    );
}

export default List_Page;
