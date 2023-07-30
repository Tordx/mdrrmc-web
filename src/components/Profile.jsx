import React , {useContext, useEffect , useState} from 'react';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../newstyle.css'
import { AuthContext } from '../context/AuthContext';
import Sidebar from './navbar/sidebar';
import sidebar_menu from './navbar/sidebarmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPencilSquare } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])

  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'user'), where('uid', '==', currentUser?.uid)));
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
      } catch (error) {
        console.error('Error getting user document: ', error);
      }
    };
  
    getUserData();
  }, []);
 
  return (
    <div className="chatContainer">
      <div className="profilecontainer">
        <Sidebar menu={sidebar_menu} />
        <div className="profile">
          <div className='info'>
            <h3>My Profile</h3>
            <img src={user.photoURL}/>
            <h4>{currentUser.displayName}</h4>
          </div>
          <div className="editinfo">
          <div className="editinfocontainer">
            <div>
              <h4>Email:</h4>
              <p>{user.email}</p>
            </div>
             <button><FontAwesomeIcon icon={faPencil} />Edit</button>
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Username:</h4>
              <p>{user.username}</p>
            </div>
            <button> <FontAwesomeIcon  icon={faPencil} />Edit</button>
            
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Password:</h4>
              <p>********</p>
            </div>
             <button><FontAwesomeIcon icon={faPencil} />Edit</button>
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Manage Notifications</h4>
            </div>
            <button className='managebutton'>Manage</button>
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Manage Location</h4>
            </div>
            <button className='managebutton' >Manage</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
