import React, { useContext , useEffect , useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { collection, query, where , getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import '../../newstyle.css'
import { faChartSimple, faComments, faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBarItem from './sidebaritem'

const Sidebar = ({menu}) => {

  const {currentUser} = useContext(AuthContext)
  const location = useLocation();
  const [active, setActive] = useState(1);
  const navigate = useNavigate()

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
            <a href='/admin/profile'>
            <img src={currentUser.photoURL} />
            </a>
            <a>{currentUser.displayName}</a>
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