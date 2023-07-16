import React , {useEffect , useState} from 'react';
import '../style.css'
import Navbar from '../components/Navbar';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'
import axios from 'axios';

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

  const handleClick = async () => {
    // Function to run when the button is clicked
  
    try {
      const serverKey = 'AAAA6yw0V8Q:APA91bEtCvykmd26k3UjjNfS9KfMmSmIrS837HBG4FzLWwVL7rnYjKYrIqFTzohzAZnojib68PdS-GJOI6FGr-KspFhj12JhKSalabXI7JoZCee_I7B9Gv7bmwyuM6Ds4bq6lGbZw4on';
      const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
  
      const querySnapshot = await getDocs(collection(db, 'token'));
      querySnapshot.docs.forEach(async (doc) => {
        const tokens = querySnapshot.docs.map((doc) => doc.data());
        console.log(tokens[0].token); // Logging the token for debugging purposes
  
        const dataArr = tokens[0].token;
  
        const messages = {
          registration_ids: dataArr,
          notification: {
            title: title,
            body: message,
          },
          data: {
            // Optional data payload
            // You can include custom data along with the notification
            // e.g., a specific action to perform when the user taps the notification
            // 'key': 'value'
          },
        };
  
        const response = await axios.post(fcmEndpoint, messages, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + serverKey,
          },
        });
  
        console.log('Notification sent successfully:', response.data);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
      {/* <div className="modal-container"> */}
        <Navbar />
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
