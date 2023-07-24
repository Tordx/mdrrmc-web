import React , {useEffect , useState} from 'react';
import '../style.css'
import Navbar from '../components/navbar/sidebar';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'
import axios from 'axios';
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { SendNotif } from '../functions';

const Alert = () => {

  // const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [documentData, setDocumentData] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    SendNotif(title, message)
  }

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
    <div className='chatContainer'>
    <div className="container">
        <Sidebar menu={sidebar_menu} />
        <div className="modal-content">
          <h3>Alert</h3>
          <div className="content1">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
  
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
            />
          </div>
          <button onClick={handleClick}>Send Notification</button>
          {/* <button className="modal-close" >
            Close
          </button> */}
        </div>
      {/* </div> */}
    </div>
  </div>
    );
};

export default Alert;
