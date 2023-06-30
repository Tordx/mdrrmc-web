import React from 'react';
import '../style.css'
import Image1 from '../img/erro404image2.png'
import Image2 from '../img/erro404image.png'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const images = [
    Image1,
    Image2

];

const Error404 = () => {
  
  const { currentUser } = useContext(AuthContext);
  const randomImage = images[Math.floor(Math.random() * images.length)];


  return (
    <div className="error-container">
        
        <img src={randomImage} alt="Default"  width = {500} />
        <h1>seems like you're lost.</h1>
        <p>This page doesn't exist</p>
        <a href = {currentUser === null ? "/" : "/admin" + "/chat"}>go back home</a>
    </div>
  );
};

export default Error404;