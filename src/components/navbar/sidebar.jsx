import React, { useContext , useEffect , useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import '../../newstyle.css'
import { faChartSimple, faComments, faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBarItem from './sidebaritem'

const Sidebar = ({menu}) => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])
  const location = useLocation();
  const [active, setActive] = useState(1);
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

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    return (
        <div className="sidebar">
          <div>
            <img  src={user.photoUrl} alt="User Profile" />
            <a className="username" href="/admin/profile">
              {user.username}
            </a>
            <ul>
              
            <h3>Menu</h3>
                {menu.map((item, index) => (
                                <div key={index}  onClick={() => __navigate(item.id)}>
                                    <SideBarItem
                                        active={item.id === active}
                                        item={item} />
                                </div>
                ))}
            </ul>
          </div>
          <button className='logout-button apple' onClick={handleLogout}>Logout</button> 
        </div>
    );
}

export default Sidebar


{/* <div className="myProfilePic">
<img src={user.photoUrl} style={{width: 100}}/>
</div>

  
 
*/}