import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../style.css'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
      <img src={currentUser.photoURL} alt="" />
        </div>
      <h2>LABRADOR PWD ADMIN</h2>
    </div>
  )
}

export default Navbar