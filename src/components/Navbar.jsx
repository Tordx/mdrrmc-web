import React, { useContext , useEffect , useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'
const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])

  // console.log('currentUser');
  // console.log(currentUser.uid);
  // console.log('currentUser');

  const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'user'), where('uid', '==', "fSLC9Wd2QxXnF6WwzWuzpHMa9233")));
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          setUser(doc.data())
        });
      } catch (error) {
        console.error('Error getting user document: ', error);
      }
    };
  
    getUserData();
  }, []);
  
  // console.log('user');
  // console.log(user.name);
  // console.log('user');
  const handleLogout = () => {
      signOut(auth).then(() => {
          navigate('/')
      });
    };

    const handleBoxClick = (boxColor) => {
      console.log(`Clicked on ${boxColor} box!`);
      // Perform additional actions on box click
    };

  return (
    <div className='navbar'>
     <div className="myProfilePic" onClick={() => handleBoxClick('red')}>
      <img src={user.photoUrl} style={{width: 100}}/>
    </div>

        <a href="/admin/profile">{user.name}</a>
        <li><a href="/about">Menu</a></li>
        <li><a href="/services">Dashboard</a></li>
        <li><a href="/contact">Community</a></li>
        <li><a href="/contact">Alert</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
    </div>
  )
}

export default Navbar