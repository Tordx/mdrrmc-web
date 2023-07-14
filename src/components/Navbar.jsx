import React, { useContext , useEffect , useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../newstyle.css'
const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])

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
  
  const handleLogout = () => {
      signOut(auth).then(() => {
          navigate('/')
      });
    };

  return (
    <div className="sidebar">
      <div>
          <img src={user.photoUrl}/>
          <a href="/admin/profile">{user.username}MY USERNAME</a>
          <h3>MENU</h3>
      </div>
    </div>
  )
}

export default Navbar


{/* <div className="myProfilePic">
<img src={user.photoUrl} style={{width: 100}}/>
</div>

  
  <li><a href="/admin/chat">Dashboard</a></li>
  <li><a href="/contact">Community</a></li>
  <li><a href="/admin/alert">Alert</a></li>
 <a onClick={handleLogout}>Logout</a> */}