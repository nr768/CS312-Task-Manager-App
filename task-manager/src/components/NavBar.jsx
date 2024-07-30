import React from "react";
import {useNavigate } from 'react-router-dom'

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
  return (
    <div className="nav_bar">
        <ul>
          <Nav_Item text = "Home" path="/"/>
          <Nav_Item text = "List 1" path="/List1"/>
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
