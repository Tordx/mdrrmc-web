import React, { useState } from "react";
import { collection, getDocs , doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import MDSW from "../img/DSWD-Logo.png";
import MOL from "../img/Labrador-Logo.png";
import "../style.css";

const Home = ({ fileData }) => {

  const [openstatuscheck, setOpenStatusCheck] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [emailcheck, setEmailcheck] = useState("");
  const [openModal, setOpenModal] = useState(false)

  const checkstatus = async() => {
    setOpenStatusCheck(false);
    const querySnapshot = await getDocs(collection(db, "users"));
    const userdata = []
    querySnapshot.forEach((doc) => {
      if(doc.data().email === emailcheck || doc.data().FullName === emailcheck){
        userdata.push({
          FullName: doc.data().FullName,
          Status: doc.data().Status,
          deactreason: doc.data().deactreason,
        })
      }
    })
    if (userdata.length > 0) {
      setUserStatus(userdata)
      setOpenModal(true)
    } else {
      
      setOpenStatusCheck(true);
      alert("No application found with the provided email.");
    }
  };

  const downloadApk = () => {
    const apkUrl = "https://www.mediafire.com/file/7bdbaix7fcw6a2n/app-universal-release.apk/file";
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'lab-pwd-app.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="download-page-container">
      <div>
        <img src={MDSW} width={250} height={150} draggable={false} />
        <img src={MOL} width={160} height={160} draggable={false} />
      </div>
      <h1 className="app-name">LABRADOR PWD</h1>
      <div className="app-description">
        <p>
          Join the inclusive community of people with disabilities on LABRADOR PWD App, where you can connect with others, and find valuable resources.
        </p>
      </div>
      <div className="app-buttons">
        <a onClick={downloadApk} className="download-button apple" download>
        <img src="https://i.imgur.com/Lt5ChPj.png" width={40} alt="Apk File" />
        Download APK
        </a>
        <a href="/form/public" className="download-button apple">
          <img src="https://i.imgur.com/cpeBlxH.png" width={30} alt="Google Play" />
          Application form
        </a>
      </div>
      <a href="/login" className="home-login-button home-login">
        ADMIN LOGIN
      </a>
      
      {openstatuscheck && (
        <div className="inputcontainer1">
          
         
          <div className="statusinput">
           
            <h3>Check your Application Status</h3>
            <input type="text" placeholder=" Registered email" value={emailcheck} onChange={(event) => setEmailcheck(event.target.value)} />
            <button style = {{borderRadius: 10}}  onClick={checkstatus}>Check</button>
            <a className="statusclose" onClick={() => setOpenStatusCheck(false)}>X</a>
          </div>
        </div>
      )}
      
      
      {!openstatuscheck && <a className="home-application-status-button" onClick={() => setOpenStatusCheck(true)}>
          Application Status
        </a>}
        {openModal && userStatus  && userStatus.map((item) => (
          <div className="modal-overlay">
            <button onClick={() => setOpenModal(false)}> close</button>
            <div className="modal">
            
              <div className={`status-header ${item.Status.toLowerCase()}`}>
                {item.Status}
              </div>
              <h3>{item.FullName}</h3>
              <h3>REMARKS: {item.deactreason}</h3>
            </div>
          </div>  
        ))}
      
    </div>
  );
};

export default Home;