import React, { useState } from "react";
import {HashRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from "./Header";
// import Footer from "./Footer";
// import Note from "./Note";
// import CreateArea from "./CreateArea";
// import Filter_Box from "./FilterBox";
// import Big_Box from "./BigBox";
// import Nav_Bar from "./NavBar";
import Home_Page from "../Pages/HomePage";
import List_Page from "../Pages/ListPage";

{
  /* this is the app file to get all of the components together. 
The only things that have changed from the worksheet 7 are I added some 
extra jsx elements
*/
}

function App() {
  return(
    <Router> 
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        {/* To get to list one just do: http://localhost:3000/#/List1  */}
        <Route path="/List1" element={<List_Page/>}/> 
      </Routes>
    </Router>
  )
  

}

export default App;
