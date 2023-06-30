import React, { useEffect, useState } from "react";
import addPortrait from "../img/userIcon.png";
import DocUpload from '../img/document-file-page-paper-sheet-up-upload-icon-3.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Firestore, Timestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import MDSW from '../img/DSWD-Logo.png'



const AnnoucementForm = ({}) => {

  const now =  new Date();
  const chatdate = now.toLocaleDateString();
  const chattime = now.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true});
  const date = new Date();
  const year = date.getFullYear();
  const createdate = date.toLocaleDateString()
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventname, setEventName] = useState('');
  const [userID, setUserID] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [eventplace, setEventPlace] = useState('');
  const [startofevent, setStartofEvent] = useState('');
  const [starttime, setStartTime] = useState('');
  const [endofEvent, setEndofEvent] = useState('');
  const [endtime, setEndTime] = useState('');
  const [eventdecs, setEventDecs] = useState('');
  const [batchCode, setBatchCode] = useState(year);
  const [image, setImage] = useState('');
  const navigate = useNavigate();



  function convertTime(time) {
    const [hours, minutes] = time.split(':');
    const date = new Date(0, 0, 0, hours, minutes);
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
  }
  
  // Example usage
  const stamp = Timestamp.now()
  const timestamp = stamp.toDate()
  const starttimes = convertTime(starttime);
  const endtimes = convertTime(endtime);

  const generateNumbers = () => {
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    setUserID(randomNumber.toString());
  };

  useEffect(() => {
    generateNumbers()
  },[])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    if (eventname.length === 0) {
      alert("Please fill in all the required fields");
      setLoading(false);
    } else {
      try {
        const date = new Date().getTime();
        if (image === "") {
          // If image is empty, set downloadURL to an empty string
          const downloadURL = "";
          const userDocRef = doc(db, "announcement", userID);
          await setDoc(userDocRef, {
            uid: userID,
            date: createdate,
            displayName: eventname,
            eventname: eventname,
            userID: userID,
            email: email,
            batchCode: batchCode,
            phoneNumber: phoneNumber,
            landlineNumber: landlineNumber,
            startofevent: startofevent,
            starttime: starttimes,
            endtime: endtimes,
            endofEvent: endofEvent,
            eventplace: eventplace,
            department: department,
            eventdecs: eventdecs,
            chattime: chattime,
            chatdate: chatdate,
            Status: "Active",
            photoURL: downloadURL,
            timestamp: timestamp,
     
          });
          console.log(userDocRef);
          console.log("this was read too");
          localStorage.setItem("formSubmitted", "true");
          navigate("/admin/annoucementlist");
        } else {
          const storageRef = ref(storage, `${eventname + date}`);
          await uploadBytesResumable(storageRef, image).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              console.log(downloadURL);
              const userDocRef = doc(db, "announcement", userID);
              await setDoc(userDocRef, {
                uid: userID,
                date: createdate,
                displayName: eventname,
                eventname: eventname,
                userID: userID,
                email: email,
                batchCode: batchCode,
                starttime: starttimes,
                endtime: endtimes,
                startofevent: startofevent,
                endofEvent: endofEvent,
                eventplace: eventplace,
                department: department,
                eventdecs: eventdecs,
                chattime: chattime,
                chatdate: chatdate,
                Status: "Active",
                photoURL: downloadURL,
                timestamp: timestamp,
                
              });
              console.log(userDocRef);
              console.log("this was read too");
              localStorage.setItem("formSubmitted", "true");
              navigate("/admin/annoucementlist");
            });
          });
        }
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }
    }
  };

   return (
    <div className="formContainer">
      {loading && 
        <div className="loading-modal">
          <div className="loading-content">
            <div className="spinner"></div>
              <p>Loading...</p>
          </div>
        </div>} 
        <Header/>
     <div className="formWrapper">
    <div className="LabelWrapper">
      <form onSubmit={handleSubmit}>
      <div className="formlogo">
          <img src={MDSW} width = {150} draggable = {false}/>
        </div>
        <h1 className="pageTitle">Annoucement form</h1>
        
        <div className="FootForm">
          <div className="long-label">
            <label htmlFor="name">Annoucement Title <span className="required">*</span><h6 class="tooltiptext">section required</h6></label>
            <input placeholder="Annoucement Title" required type="text" name="fullName" value={eventname} onChange={(e) => setEventName(e.target.value)} />
            <label htmlFor="name" style = {{marginTop: '5px'}}>Annoucement Description <span className="required">*</span><h6 class="tooltiptext">section required</h6></label>
            <textarea placeholder="Annoucement Desc" style = {{height: '150px', fontSize: '1.25rem', marginTop: '1px'}} required type="text" name="fullName" value={eventdecs} onChange={(e) => setEventDecs(e.target.value)} />
          </div>
          <div className="HeadForm">
            
          <div className="row-label" >
            <label htmlFor="email">Department <span className="required">*</span></label>
              <input placeholder="Department Name" required type="email" name="email" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
            </div>
          <div className="HeadForm">
            <div className="row-label">
            <label htmlFor="time">Start of the Event</label>
              <input  
              placeholder= 'Start Time' 
              style = {{marginBottom: '10px'}} 
              required 
              onFocus={(e) => (e.target.type = "time")}
              onBlur={(e) => (e.target.type = "time")} 
              name="Time"
              onChange={(e) => setStartTime(e.target.value)}/>
              <input 
              placeholder="Start Date"  
              name="date" 
              value={startofevent} 
              onChange={(e) => setStartofEvent(e.target.value)} 
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              />  
            </div>
            <div className="row-label">
              <label htmlFor="date">End of the Event</label>
              <input  
              placeholder= 'Time' 
              style = {{marginBottom: '10px'}} 
              required 
              onFocus={(e) => (e.target.type = "time")}
              onBlur={(e) => (e.target.type = "time")} 
              name="Time"
              onChange={(e) => setEndTime(e.target.value)}/>
              <input 
              placeholder="date"  
              name="date" 
              value={endofEvent} 
              onChange={(e) => setEndofEvent(e.target.value)} 
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              />  
            </div>
          </div>
          <div className="long-label">
            <label htmlFor="address">Venue or Place of Event</label>
            <input placeholder="Barangay, Town/City"  name="address" value={eventplace} onChange={(e) => setEventPlace(e.target.value)} />
          </div>
          <div className="HeadForm">
          </div>
         <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
              <img src={addPortrait} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Add Annoucement Picture</span>
            </label>
            <input style={{ display: "none" }} type="file" id="img" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          </div>
          <button disabled={loading} onClick = {handleSubmit}>POST ANNOUNCEMENTS</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementForm;
