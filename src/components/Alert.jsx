import React , {useEffect , useState} from 'react';
import '../style.css'
import Navbar from './Navbar';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'

const Alert = () => {

  // const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])

  // const navigate = useNavigate()

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
 
  return (
    <div>
        {/* <Navbar/> */}
    <div className="modal">
      {/* <Navbar/> */}
    <div className="modal-continer">
        <Navbar/>
      <div className="modal-content">
        <h3>Alert</h3>
        {/* <button className="modal-close" >
          Close
        </button> */}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Alert;
