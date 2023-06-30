import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom';
import '../style.css'

export default function Header() {

    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/')
        });
      };
    
  return (
    <div className='button-container'>
      <img
      src= {require('../img/DSWD-Logo.png')}
      width = {90} height = {50}
      />
      <a href="/admin/chat">CHAT</a>
      <a href="/admin/userlist">USER LIST</a>
      <a href="/admin/form">APPLICATION FORM</a>
      <a href="/admin/applicationlist">APPLICATION LIST</a>
      <a href="/admin/annoucementlist">ANNOUNCEMENTS</a>
      <span onClick={handleLogout}><p>LOG OUT</p></span>
      </div>
  )
}
