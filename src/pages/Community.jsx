
import { doc, onSnapshot, updateDoc, collection, getDocs, getDoc, Firestore, deleteDoc, setDoc } from "firebase/firestore";
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
import { faEllipsisVertical, faMessage, faPaperPlane, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ReactTimeago from "react-timeago";
import { FastForwardTwoTone } from "@mui/icons-material";
import {Timestamp} from "firebase/firestore";
import generateRandomString from "../components/autogeneratenumber";

const Community = () => {

    const [chats, setChats] = useState([]);
    const [post, setpost] = useState([])
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [notif, setnotif] = useState([]);
    const [postid, setpostid] = useState([]);
    const [likes, setlikes] = useState([]);
    const [likedata, setlikedata] = useState([])
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [opencomment, setopencomment] = useState(false)
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
            const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), docid: doc.id }));
            setpost(postsData);
          });
          return unsub;
        };

        const getNoif = () => {
          const unsub = onSnapshot(collection(db, "notifications"), (snapshot) => {
            const notifdata = snapshot.docs.map((doc) => doc.data());
            setnotif(notifdata);
            console.log(notifdata);
          });
          return unsub;
        };

        const getLikes = () => {
          const unsub = onSnapshot(collection(db, "community-likes"), (snapshot) => {
            const likesdata = snapshot.docs.map((doc) => doc.data());
            const extractedLikes = likesdata.map((like) => like.postid);
            setlikes(extractedLikes);
            setlikedata(likesdata)
          });
          return unsub;
        };
         const getComments = () => {
          const unsub = onSnapshot(collection(db, "community-comments"), (snapshot) => {
            const commentdata = snapshot.docs.map((doc) => doc.data());
            setComments(commentdata);
          });
          return unsub;
        };
        getNoif();
        getPosts();
        getLikes();
        getComments();
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

    const handleButtonClick = async (postid, likesCount, docid) => {
    if (currentUser.displayName) {
      const existingStatus = likes.includes(postid);
      const newStatus = !existingStatus;

      setlikes((prevLikes) =>
        newStatus ? [...prevLikes, postid] : prevLikes.filter((id) => id !== postid)
      );

      await handleReaction(postid, currentUser.displayName, newStatus, likesCount);
    }
  };
  
 const handleReaction = async (postid, displayName, status, likesCount) => {
  const id = generateRandomString();
  const likeData = likedata.find(like => like.postid === postid);
  const newLikeRef = doc(db, "community-likes", id);
  const postRef = doc(db, "community-posts", postid);
    if (likeData) {
    const likeRef = doc(db, "community-likes", likeData.docid);
    await deleteDoc(likeRef);
    await updateDoc(postRef, { likes: likesCount - 1 });
    } else if (status) {
      const newLike = {
        userid: currentUser.uid,
        displayName: displayName,
        postid: postid,
        likeid: "",
        status: true,
        docid: id,
        time: Timestamp.now(),
      };
      await setDoc(newLikeRef, newLike);
      await updateDoc(postRef, { likes: likesCount + 1 });
  } 
 }

   const handleSubmit = async (postid, comment) => {
    const id = generateRandomString()
    const commentRef = doc(db, "community-comments", id);
    const postRef = doc(db, "community-posts", postid);
    const newCommentData = {
      commentdata: newComment,
      time: Timestamp.now(),
      commenterimage: currentUser.photoURL,
      commentername: currentUser.displayName,
      postid: postid,
      docid: id,
    };

    await setDoc(commentRef, newCommentData)
    await updateDoc(postRef, { comment: comment + 1 })
      .then(() => {
        setNewComment('');
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
    };


  const handleOpenComment = (postid) => {
  setopencomment(prevState => ({
    ...prevState,
    [postid]: !prevState[postid]
  }));
};

  return (
    <div className="homecontainer">
      <div className="darkcontainer">
        <Sidebar menu={sidebar_menu}/>
        
        <div className="feedContainer">
  {post.map((p) => {
        const firstDataItem = p.time;
        const timeInSeconds = firstDataItem?.seconds;
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date;
        const maplikes = likes.includes(p.postid);
        return (
          <div className="feedItem" key={p.docid}>
          <div className="postHeader">
              <img className="userProfileImage" src={p.photoURL} alt="User Profile" />
              <div className="userInfo">
                <p className="displayName">{p.displayName}</p>
                <ReactTimeago className="time" date={formattedTime} />
              </div>
            </div>
             {p.image && <img className="postImage" src={p.image} alt="Post" />}
            <p className="postDescription">{p.description}</p>
            <div className="postStats">
              <span
                onClick={() => handleButtonClick(p.postid, p.likes, p.docid)}
                className={maplikes ? "reactions-active" : "reactions-inactive"}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <p>Liked Post {p.likes}</p>
              </span>
              <span onClick={() => handleOpenComment(p.postid)} className="reactions-inactive">
              <FontAwesomeIcon icon={faMessage} />
              <p>Comments {p.comment}</p>
              </span>
              <span className="reactions-inactive">
                <FontAwesomeIcon icon={faShare} />
                <p>Shares {p.shares}</p>
              </span>
            </div>
             <div>
            {opencomment[p.postid] && (
              <div className="comments-header">
                <h1>Comments</h1>
                <span>
                  <input 
                    placeholder="Write your comment..." 
                    value = {newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); 
                      handleSubmit(p.postid, p.comment);
                    }
                    }}
                  />
                  <a  onClick={() => handleSubmit(p.postid, p.comment)}>
                  <FontAwesomeIcon icon = {faPaperPlane} />
                  </a>
                </span>
                <div>
                  {comments
                    .filter(comment => comment.postid === p.postid)
                    .map((comment, index) => { 
                      const firstDataItem = comment.time;
                      const timeInSeconds = firstDataItem?.seconds;
                      const date = new Date(timeInSeconds * 1000);
                      const formattedTime = date;
                      return(
                      <div className="comments-list">
                      <img key={index} src= {comment.commenterimage} />
                      <div>
                       <h2 key={index}>{comment.commentername}</h2>
                      <p key={index}>{comment.commentdata}</p>
                       <ReactTimeago className="comment-time" date={formattedTime} />
                      </div>
                      </div>
                  )})}
                </div>
              </div>
            )}
            </div>
          </div>
        );
      })}
</div>
  <div>
  <div class="notiflist">
      <h4>Notification</h4>
      {notif.map((n) => {
        const firstDataItem = n.time
        const timeInSeconds = firstDataItem.seconds
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date;

        return (
          <div class="notification-item">
            <img src={n.image} alt="Notification Image" />
            <div class="notification-content">
              <p>{n.title}</p>
              <ReactTimeago className="time" date={formattedTime} />
            </div>
          </div>
        );
      })}
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
          <img src={chat[1].userInfo?.photoURL || 'https://i.imgur.com/rUn1IlG.png'} alt="" />
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
      
      <div className="chatbox">
      <Messages/>
      <Input/>
      </div>
  </div>
      
  </div>
  )
}

export default Community