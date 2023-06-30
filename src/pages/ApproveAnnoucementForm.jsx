import React, { useEffect, useState } from "react";
import addPortrait from "../img/userIcon.png";
import DocUpload from '../img/document-file-page-paper-sheet-up-upload-icon-3.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc , updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import MDSW from '../img/DSWD-Logo.png'
import { useSelector } from "react-redux";


const ApproveAnnoucementForm = ({}) => {

  
  const annoucement =  useSelector(state => state.currentUser)


  const date = new Date();
  const year = date.getFullYear();
  const createdate = date.toLocaleDateString()
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventname, setEventName] = useState(annoucement.user.eventname);
  const [userID, setUserID] = useState(annoucement.user.userID);
  const [email, setEmail] = useState(annoucement.user.email);
  const [phoneNumber, setPhoneNumber] = useState(annoucement.user.phoneNumber);
  const [landlineNumber, setLandlineNumber] = useState(annoucement.user.landlineNumber);
  const [department, setDepartment] = useState(annoucement.user.department);
  const [eventplace, setEventPlace] = useState(annoucement.user.eventplace);
  const [starttime, setStartTime] = useState(annoucement.user.starttime);
  const [endtime, setEndTime] = useState(annoucement.user.endtime);
  const [startofevent, setStartofEvent] = useState(annoucement.user.startofevent);
  const [endofEvent, setEndofEvent] = useState(annoucement.user.endofEvent);
  const [eventdecs, setEventDecs] = useState(annoucement.user.eventdecs);
  const [chattime, setChatTime] = useState(annoucement.user.chattime);
  const [chatdate, setChatDate] = useState(annoucement.user.chatdate);
  const [batchCode, setBatchCode] = useState(annoucement.user.batchCode);
  const [deactreason, setdeactreason] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(annoucement.user.photoURL); 
  const [file, setFile] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    console.log(annoucement);
  },[])

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

        if (
          eventname.length === 0 ||
          eventdecs.length === 0) {
    alert('Please fill in all the required fields')
    setLoading(false);
    }else {
  
    try {
   
      const date = new Date().getTime();
      const storageRef = ref(storage, `${eventname + date}`);
      const data2 = ('')
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            const userDocRef = doc(db, "announcement", userID);
            await updateDoc(userDocRef, {
              uid: userID,
              date: createdate,
              displayName: eventname,
              eventname:  eventname,
              batchCode: batchCode,
              startofevent: startofevent,
              endofEvent: endofEvent,
              eventplace: eventplace,
              department: department,
              eventdecs: eventdecs,
              starttime: starttime,
              endtime: endtime,
              chattime: chattime,
              chatdate: chatdate,
              Status : status,
              photoURL: image === annoucement.user.photoURL ? image : downloadURL
            });
            console.log(userDocRef)
            console.log('this was read too')
            localStorage.setItem("formSubmitted", "true");
            navigate("/admin/annoucementlist");
        });
        
      });
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
              onBlur={(e) => (e.target.type = "text")} 
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
              onBlur={(e) => (e.target.type = "text")} 
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
          <div className="HeadForm">
          <div className="row-label">
            <label htmlFor="address">Venue or Place of Event</label>
            <input placeholder="Barangay, Town/City"  name="address" value={eventplace} onChange={(e) => setEventPlace(e.target.value)} />
            
          </div>
            <div className="row-label">
                  <label htmlFor="typeOfDisability">USER STATUS <span className="required">*</span></label>
                    <select required type="text" name="typeOfDisability" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Select">Select</option>
                      <option value="Active">Active</option>
                      <option value="Done">Deny</option>
                      <option value="Deactivated">Deactivate</option>
                    </select>
            </div>
            {status === 'Deactivated' && <div className="row-label">
              <label htmlFor="approvingOfficer">REASON/S FOR DEACTIVATION </label>
              <input  type="text" name="approvingOfficer" value={deactreason} onChange={(e) => setdeactreason(e.target.value)} />
            </div>}
          </div>
         <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
              <img src={addPortrait} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Update Annoucement Picture</span>
            </label>
            <input style={{ display: "none" }} type="file" id="img" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          </div>
          <button disabled={loading} onClick = {handleSubmit}>UPDATE ANNOUNCEMENTS</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApproveAnnoucementForm;



            