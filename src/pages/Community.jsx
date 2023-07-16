
import { doc, onSnapshot, updateDoc, collection, getDocs, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import '../style.css';

const Community = () => {

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats",'mdrNgqcK8NPADFBCQqIa'), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
        console.log(currentUser.uid);
        currentUser.uid && getChats();
      }, [currentUser.uid]);
    

      const handleSelect = async (u) => {
        dispatch({ type: "CHANGE_USER", payload: u[1].userInfo });
    
        console.log(u[1].lastMessage.isRead);
    
        try {
          const chatDocRef = doc(db, "userChats", 'mdrNgqcK8NPADFBCQqIa');
          await updateDoc(chatDocRef, {
            [`${u[0]}.lastMessage.isRead`]: true
          });
        } catch (error) {
          console.error("Error updating isRead value:", error);
        }
      };
    console.log(chats);
    // console.log(chats.mdrNgqcK8NPADFBCQqIa0WExfTKqtpb2Neu86MtX6YaIRM92.userInfo.Fullname);
    console.log('chats');
    // <h5>{chats.mdrNgqcK8NPADFBCQqIa0WExfTKqtpb2Neu86MtX6YaIRM92?.userInfo?.FullName}</h5>
    // <h5>{chats.mdrNgqcK8NPADFBCQqIa0WExfTKqtpb2Neu86MtX6YaIRM92?.lastMessage?.text}</h5>
  
  return (
    <div >
    {Object.entries(chats)
      ?.sort((a, b) => b[1].date - a[1].date)
      .map((chat) => (
        <div
          className={`userChat ${chat[1].lastMessage?.isRead ? "" : "userChatbold"}`}
          key={chat[0]}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>
              {chat[1].userInfo?.FullName?.charAt(0).toUpperCase() +
                chat[1].userInfo?.FullName?.slice(1)}
            </span>
            <p className={chat[1].lastMessage ? null : "lastmessage"} >
              {chat[1].lastMessage?.text}
              {chat[1].lastMessage?.isRead ? null : (
              <span className="newMessageCircle"></span>  
            )}
            </p>

          </div>
        </div>
      ))}
  </div>
  )
}

export default Community