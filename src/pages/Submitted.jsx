import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Submitted() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      const formSubmitted = localStorage.getItem("formSubmitted");
  
      if (formSubmitted !== "true") {
        if (currentUser){
          navigate("/admin/form");
          } else {
            navigate("/")
          }
      }
    }, []);

    const goback = () => {
      
      localStorage.setItem("formSubmitted", "false");
      if (currentUser !== null){
        navigate("/admin/form");
      } else {
        
        navigate("/")
        
      }
    }
  
  return (
    <div className="submitcontainer">
        <div className='submitwrapper'>
            <div className="checkmark-container">
                <div className = "sidecheckmark"></div>
                <div className="checkmark"></div>
            </div>
        <h1>Thank You for Submitting Your Form!</h1>
            <p>Your submission has been received and is currently being reviewed</p>
            <p>A confirmation email has been sent, you may check the current process and  you may expect the email to arrive within 24 hours</p>
            <button onClick={goback}>Go back</button>
        <div className='cta-button-container'>
        <span>MSWD Office | Municapality of Labrador, Pangasinan </span>    
     
        </div>
        </div>
  </div>
  )
}
