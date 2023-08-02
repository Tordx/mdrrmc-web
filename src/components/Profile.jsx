import React , {useContext, useEffect , useState} from 'react';
import { collection, query, where , getDocs, doc, setDoc, addDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import '../newstyle.css'
import { AuthContext } from '../context/AuthContext';
import Sidebar from './navbar/sidebar';
import sidebar_menu from './navbar/sidebarmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCloudUploadAlt, faEnvelope, faLock, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile, updatePassword } from 'firebase/auth';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRef } from 'react';
const Profile = () => {

  const {currentUser} = useContext(AuthContext)
  const [user, setUser] = useState([])
  const [openmodal, setopenmodal] = useState(false)
  const [changes, setchanges] = useState('')
  const [displayname, setdisplayname] = useState(currentUser.displayName)
  const [email, setemail] = useState(currentUser.email)
  const [photoURL, setphotoURL] = useState(currentUser.photoURL);
  const [openupload, setopenupload] = useState(false)
  const [currentpassword, setcurrentpassword] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [location, setlocation] = useState(null)
  const [permission, setPermission] = useState(Notification.permission);
  const fileInputRef = useRef(null);

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
        const getdata = doc(db, 'user' , currentuser.uid);
      const updateinfo = ({
        username: displayname,
        email: email,
        photoURL: photoURL,
        userType: 'Admin'

      });
      await setDoc(getdata , updateinfo).then(() => {
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
  
  const handleUploadButtonClick = (event) => {
    setphotoURL(event.target.files[0])
  };


  const handleImageUpload = async () => {
      if (photoURL != currentUser.photoURL) {
      try {
        setloading(true)
        const currentuser = auth.currentUser;
        const storageRef = ref(storage, `images/${photoURL.name}`);
        await uploadBytes(storageRef, photoURL);

        const imageURL = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, 'images'), { imageURL });

        await updateProfile(currentuser, {
        displayName: displayname,
        email: email,
        photoURL: imageURL,
      }).then(async() => {
        const getdata = doc(db, 'user' , currentuser.uid);
      const updateinfo = ({
        username: displayname,
        email: email,
        photoURL: imageURL,
        userType: 'Admin'

      });
      await setDoc(getdata , updateinfo).then(() => {
        setloading(false)
        alert('Successfully updated profile')
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      })

        console.log('Image uploaded and URL saved in Firestore:', docRef.id);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      }
    }

  const updatepassword = async () => {
    setloading(true)
    try {
      const currentuser = auth.currentUser;

      if (!currentuser) {
        console.error("User is not authenticated.");
        return;
      }

      const credential = EmailAuthProvider.credential(currentUser.email, currentpassword);
      await reauthenticateWithCredential(currentuser,credential);

      await updatePassword(currentuser,newpassword).then(() => {
          setloading(false)
          alert('Password successfully changed!')
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })

    } catch (error) {
      console.error("Error updating password:", error.message);
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
  
  const askForLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setlocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const locationrequest = () => {
    alert("This website wants to access your location. Click 'Allow' to continue.");
    askForLocation();
  }


  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  


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
  const uploadImage = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 1)',
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
      {!openmodal && !openupload && <div className="profile">
          <div className='info'>
            <h3>My Profile</h3>
            <img onClick={() => setopenupload(true)} src={currentUser.photoURL}/>
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
            <button onClick={requestNotificationPermission} className='managebutton'>Manage</button>
          </div>
          <div className="editinfocontainer">
            <div>
              <h4>Manage Location</h4>
            </div>
            <button onClick={locationrequest} className='managebutton' >Manage</button>
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
            {changes === 'Email' && <input value = {email} onChange={(event) => setemail(event.target.value)} placeholder='New Email Address' />}
            {changes === 'Password' && <input onChange = {(event) => setnewpassword(event.target.value)} placeholder='New Password' />}
            {changes === 'Username' && <input value = {displayname} onChange={(event) => setdisplayname(event.target.value)}placeholder='New Username' />}
            <FontAwesomeIcon icon={changes === 'Email' ? faEnvelope : changes === 'Password' ? faLock : faUser} className="icon" />
          </div>
          <p>To confirm, Please type your password</p>
           <div className="input-container">
            <input onChange = {(event) => setcurrentpassword(event.target.value)} placeholder='Confirm Password' />
            <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
          <br/>
          {changes === 'Password' ? <button onClick={handlePasswordUpdate} className='logout-button apple '>Save</button> : <button onClick={update} className='logout-button apple '>Save</button>}
        </div>
      </ReactModal>
       <ReactModal
        isOpen = {openupload}
        style={uploadImage}
      >
        <button className="go-back-button" onClick={() => setopenupload(false)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>&nbsp; Back</span>
        </button>
        <div className='upload-container'>
         <img className='uploaded-image' src={currentUser.photoURL}/>
          <input
            className='uploadImage'
            type="file"
            ref={fileInputRef}
            accept=".jpeg, .jpg, .png"
            onChange={handleUploadButtonClick}
          />
          <a href="#" onClick={handleImageUpload} className="upload-link">
            <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
            Choose and Upload Image
          </a>
        </div>
      </ReactModal>
    </div>
  );
};

export default Profile;


  