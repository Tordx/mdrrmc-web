import React , {useContext, useEffect , useState} from 'react';
import { collection, query, where , getDocs, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import '../newstyle.css'
import { AuthContext } from '../context/AuthContext';
import Sidebar from './navbar/sidebar';
import sidebar_menu from './navbar/sidebarmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEnvelope, faLock, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile, updatePassword } from 'firebase/auth';
import { v4 as uuid } from "uuid";
const Profile = () => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])
  const [openmodal, setopenmodal] = useState(false)
  const [changes, setchanges] = useState('')
  const [displayname, setdisplayname] = useState(currentUser.displayName)
  const [email, setemail] = useState(currentUser.email)
  const [photoURL, setphotoURL] = useState(currentUser.photoURL);
  const [currentpassword, setcurrentpassword] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [loading, setloading] = useState(false)
  
  const update = async() => {
    
    try {
      setloading(true)
      const currentuser = auth.currentUser;
      const credential = EmailAuthProvider.credential(currentUser.email, currentpassword);
      await reauthenticateWithCredential(currentuser, credential);
      await updateProfile(currentuser, {
        displayName: displayname,
        email: email,
        photoURL: photoURL,
      }).then(async() => {
        const earthquakeRef = doc(db, 'user' , currentuser.uid);
      const notifData = ({
        username: displayname,
        email: email,
        photoURL: photoURL,
        userType: 'Admin'

      });
      await setDoc(earthquakeRef , notifData).then(() => {
        setloading(false)
        alert('Successfully updated profile')
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      })

    } catch(error){
      console.log(error);
    }
  }

  const updatepassword = async (currentPassword, newPassword) => {
  try {
     const currentuser = auth.currentUser;
    const credential = EmailAuthProvider.credential(currentuser.email, currentPassword);
    await reauthenticateWithCredential(currentuser, credential);
    await updatePassword(currentuser.email, newPassword);

    console.log("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

const handlePasswordUpdate = () => {
    updatepassword(currentpassword, newpassword);
    setcurrentpassword("");
    setnewpassword("");
  };

  
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


  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      padding: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '700px',
      maxWidth: '700px',
      maxHeight: '1000px',
      maxHeight: '1000px',
      borderColor: '#00000000'
    },
  };
  return (
    <div className="chatContainer">
    {loading && <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>}
      <div className="profilecontainer">
        <Sidebar menu={sidebar_menu} />
      {!openmodal && <div className="profile">
          <div className='info'>
            <h3>My Profile</h3>
            <img src={currentUser.photoURL}/>
            <h4>{currentUser.displayName}</h4>
          </div>
          <div className="editinfo">
          <div className="editinfocontainer">
            <div>
              <h4>Email:</h4>
              <p>{currentUser.email}</p>
            </div>
             <button onClick={() => {setopenmodal(true); setchanges('Email')}}><FontAwesomeIcon icon={faPencil} />Edit</button>
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Username:</h4>
              <p>{currentUser.displayName}</p>
            </div>
            <button onClick={() => {setopenmodal(true); setchanges('Username')}}><FontAwesomeIcon  icon={faPencil} />Edit</button>
            
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Password:</h4>
              <p>********</p>
            </div>
             <button onClick={() => {setopenmodal(true); setchanges('Password')}}><FontAwesomeIcon icon={faPencil} />Edit</button>
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
        </div>}
      </div>
      <ReactModal
        isOpen = {openmodal}
        style={customStyles}
      >
      <button className="go-back-button" onClick={() => setopenmodal(false)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>&nbsp; Back</span>
        </button>
        <div className='editemail'>
          <h2>Update {changes}</h2>
           <br/>
          <div className="input-container">
            {changes === 'Email' && <input value = {email} onChange={(event) => {setemail(event.target.value)}} placeholder='New Email Address' />}
            {changes === 'Password' && <input onChange = {(event) => {setnewpassword(event.target.value)}} placeholder='New Password' />}
            {changes === 'Username' && <input value = {displayname} onChange={(event) => setdisplayname(event.target.value)}placeholder='New Username' />}
            <FontAwesomeIcon icon={changes === 'Email' ? faEnvelope : changes === 'Password' ? faLock : faUser} className="icon" />
          </div>
          <p>To confirm, Please type your password</p>
           <div className="input-container">
            <input onChange = {(event) => {setcurrentpassword(event.target.value)}} placeholder='Confirm Password' />
            <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
          <br/>
          {changes === 'Password' ? <button onClick={handlePasswordUpdate} className='logout-button apple '>Save</button> : <button onClick={update} className='logout-button apple '>Save</button>}
        </div>
      </ReactModal>
    </div>
  );
};

export default Profile;
