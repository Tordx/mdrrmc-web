import React, { useContext , useEffect , useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../newstyle.css'
import { faChartSimple, faComments, faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <img  src={user.photoUrl} alt="User Profile" />
            <a className="username" href="/admin/profile">
              {user.username}
            </a>
            <ul className="menu-list">
            <h3>Menu</h3>
              <li><FontAwesomeIcon icon={faChartSimple} size ='xl' /><a href="/admin/chat">Dashboard</a></li>
              <li><FontAwesomeIcon icon={faComments} size ='xl'/><a href="/contact">Community</a></li>
              <li><FontAwesomeIcon icon={faBullseye} size ='xl'/><a href="/admin/alert">Alert</a></li>
            </ul>
          </div>
          <button className='logout-button apple' onClick={handleLogout}>Logout</button> 
        </div>
    );
}

export default Navbar


{/* <div className="myProfilePic">
<img src={user.photoUrl} style={{width: 100}}/>
</div>

  
 
*/}