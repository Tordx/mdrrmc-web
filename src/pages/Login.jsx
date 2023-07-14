import React, { useState , useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import MOL from '../img/img/1yHrmHy.png'
import { auth, db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import '../newstyle.css'
import { Icon, IconButton } from "@mui/material";
const Login = () => {

  useEffect(() => {
   const getUserData = async () => {
  try {

    const querySnapshot = await getDocs(collection(db, 'user'));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.log(error);
    console.log('Error getting user documents: ', error);
  }
};

getUserData();
    
    // If the above line executes without errors, Firebase is running

    // ...other code
  }, []);



  const [loginemail, setloginEmail] = useState('');
  const [loginpassword, setloginPassword] = useState('');
  const navigate = useNavigate();

  const checkStatus = async (e) => {
    e.preventDefault()
    const querySnapshot = await getDocs(collection(db, "user"));
    const userData = [];
  
    querySnapshot.forEach((doc) => {
      if (doc.data().email === loginemail) {
        userData.push({
          // Status: doc.data().Status,
          userType: doc.data().userType, // assuming there is a userType field in the document
        });
      }
    });
  
    if (userData.length > 0) {
      const isAdmin = userData.some((user) => user.userType === "Admin");
      console.log(isAdmin);
      if (isAdmin) {
        const email = loginemail;
        const password = loginpassword;
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin/chat");
      } else {
        alert("The provided email does not belong to an admin user.");
      }
    } else {
      alert("no matches found with the email and password provided.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={MOL} width = {'50%'} height = {'50%'} draggable = {false}/>
        <h1>MDRRMC/BDRRMC</h1>
        <p>Monitoring System</p>
     </div>
     <div>
     <form onSubmit={checkStatus} className="login-container-box" >
      <h1 >WELCOME</h1>
     <input placeholder="Email Address" onChange={(e) => setloginEmail(e.target.value)} value = {loginemail} type="text" id="email" name="username" />
     <input placeholder="Password" onChange={(e) => setloginPassword(e.target.value)} value = {loginpassword} type="password" id="password" name="password"/>
      <p>forgot password?</p>
     <button className="download-button apple" type="submit" onClick={checkStatus}>LOGIN</button>
     </form>
     
     </div>
  </div>
  );
};

export default Login;