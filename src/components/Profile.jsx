import React , {useEffect , useState} from 'react';
import '../style.css'
import Navbar from './navbar/sidebar';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'

const Profile = () => {

  // const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])

  // const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'user'), where('uid', '==', "fSLC9Wd2QxXnF6WwzWuzpHMa9233")));
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
    <div className="modal">
    <div className="modal-continer">
     <Navbar/>
      <div className="modal-content">
        <h3>My Profile</h3>
      <div className="myProfilePic" >
      <img src={user.photoURL} style={{width: 100, height: 100}}/>
    </div>
    <a href="/admin/profile">{user.name}</a>
      </div>
    </div>
    </div>
  );
};

export default Profile;
