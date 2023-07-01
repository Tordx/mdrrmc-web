import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useNavigate, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import Header from '../components/Header';
import '../style.css'
const Conversation = () => {
  return (
    <div className='chatContainer'>
      {/* <Header/> */}
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Conversation