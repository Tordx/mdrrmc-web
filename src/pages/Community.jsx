
import { doc, onSnapshot, updateDoc, collection, getDocs, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import '../style.css';
import Messages from "../components/Messages";
import Input from "../components/Input";
import ReactModal from "react-modal";
import sidebar_menu from "../components/navbar/sidebarmenu";
import Sidebar from "../components/navbar/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const Community = () => {

    const [chats, setChats] = useState([]);
    const [post, setpost] = useState([])
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats",'mdrNgqcK8NPADFBCQqIa'), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
        currentUser.uid && getChats();
      }, [currentUser.uid]);


      useEffect(() => {
        const getPosts = () => {
          const unsub = onSnapshot(collection(db, "community-posts"), (snapshot) => {
            const postsData = snapshot.docs.map((doc) => doc.data());
            setpost(postsData);
            console.log(postsData);
          });
          return () => {
            unsub();
          };
        };
        getPosts();
      }, []);

      const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '20px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          minWidth: '600px',
          maxWidth: '600px',
          maxHeight: '400px',
          maxHeight: '400px',
        },
      };
      
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    

      const handleSelect = async (u) => {
        setModalIsOpen(true);
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
    console.log('chats');
  
  return (
    <div className="chatContainer">
      <div className="container">
        <Sidebar menu={sidebar_menu}/>
        
      <div className="feedContainer">
        {post.map((p) => (
          <div className="feedItem" key={p.docid}>
            {p.photoURL && <img className="postImage" src={p.photoURL} alt="Post" />}
            <p className="postDescription">{p.description}</p>
            <div className="postStats">
              <span className="likes">{p.likes} Likes</span>
              <span className="likes">{p.comment} Comments</span>
              <span className="shares">{p.shares} Shares</span>
            </div>
          </div>
        ))}
      </div>
    <div className="chatlist">
      <h4>Messages</h4>
    {Object.entries(chats)
      ?.sort((a, b) => b[1].date - a[1].date)
      .map((chat) => (
        <div
          className={`chats ${chat[1].lastMessage?.isRead ? "" : "chats-bold"}`}
          key={chat[0]}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="chatinfo">
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
          <div className="ellipsis-container">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
        </div>
      ))}
      </div>
  </div>
  <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
      <Messages/>
      <Input/>
      </ReactModal>
      
  </div>
  )
}

export default Community