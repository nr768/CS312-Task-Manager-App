import React, { useState } from "react";
import {HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Filter_Box from "../components/FilterBox";
import Big_Box from "../components/BigBox";
import Nav_Bar from "../components/NavBar";
import Home_Page from "../Pages/HomePage";
import List_Page from "../Pages/ListPage";
import {getLists, getListById, getListByName, createList, addToList} from "../server/database.js";
const express = require('express');

// function to call to server to create a new list
function newList(props){
    createList(props.name);
}

// function to create an item in a list 
function newItem(props){
    
}

// function for creating new webage for a list once the user clicks on the icon
function toList(props){
    return getLists();
}

// function for sorting lists
function sortList(){

}

// function for sorting items in the list
function sortItems(){

}

// function to connect to database
function connectDB(){
    

}

export {newList, newItem, toList, sortList, sortItems};
