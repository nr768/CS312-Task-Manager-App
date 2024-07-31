import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';

function ListDisplay() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:3001/getLists')
      .then(response => {
        setLists(response.data);
        
      })
  }, []);

  return (
    <div >
      {lists.map(list => (
        <Note title={list.name} content={list.dueDate}/>
      ))}
    </div>
  );
}

export default ListDisplay;
