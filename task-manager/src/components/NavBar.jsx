import React, { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import ListPage from "../Pages/ListPage";


// doumentation: https://reactrouter.com/en/main/hooks/use-navigate

function Nav_Item({ text, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <li onClick={handleClick} style={{ cursor: "pointer" }}>
      {text}
    </li>
  );
}


function Nav_Bar() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:3001/getLists')
      .then(response => {
        setLists(response.data);
        
      })
  }, []);


  return (
    <div className="nav_bar">
        <ul>
          <Nav_Item text = "Home" path="/"/>
          
          {lists.map(list => (
            // the path is just a placeholder for now
            <Nav_Item text={list.name} path={`/list/${list._id}`} />
          ))}
    
        </ul>
    </div>
  );
}

export default Nav_Bar;




{
  /*
  This is for the nav bar and to render the little nav 
  bar boxes that will have all the lists
  */
}
