import React , {useContext, useEffect , useState} from 'react';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../newstyle.css'
import { AuthContext } from '../context/AuthContext';
import Sidebar from './navbar/sidebar';
import sidebar_menu from './navbar/sidebarmenu';

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
    <div className="container">
     <Sidebar menu = {sidebar_menu} />
      <div className="modal-content">
        <h3>My Profile</h3>
      <div className="myProfilePic" >
      <img src={user.photoURL} style={{width: 100, height: 100}}/>
    </div>
    <a href="/admin/profile">{user.username}</a>
      </div>
    </div>
    </div>
  );
};

export default Profile;
