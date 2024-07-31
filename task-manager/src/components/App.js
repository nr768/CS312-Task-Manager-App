import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home_Page from "../Pages/HomePage";
import List_Page from "../Pages/ListPage";
import axios from 'axios';

function App() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:3001/getLists')
            .then(response => {
                setLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching lists:', error);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home_Page />} />
                {lists.map(list => (
                    <Route 
                        key={list._id} 
                        path={`/list/${list._id}`} 
                        element={<List_Page id={list._id} name={list.name}/>} 
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
