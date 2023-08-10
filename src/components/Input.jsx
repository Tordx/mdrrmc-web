import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import '../style.css'
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const now =  new Date();
  const chatdate = now.toLocaleDateString();
  const chattime = now.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true});

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const userUID = data.user.uid
  const adminUID = "mdrNgqcK8NPADFBCQqIa";
  const ChatID = adminUID.concat(userUID);
  const UsernameAdmin = currentUser.displayName
  // const userUIDs = data.user.uid
  console.log('userUIDs');
  console.log(userUID);
  console.log('userUIDs');


  const handleSend = async () => {

    if (img) {
      
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }); 
        }
      );
    } else {
      await updateDoc(doc(db, "chats", ChatID), {
        messages: arrayUnion({
          id: uuid(),
          message: text,
          senderId: currentUser.uid,
          senderUsername: UsernameAdmin,
          date: Timestamp.now(),
          chatdate: chatdate,
          chattime: chattime,
          receiverId: data.user.uid,
          receiverName: data.user.FullName,
          typeOfUser: 'Admin',
          isRead: false
        }),
      });
    }

    await updateDoc(doc(db, "userChats", userUID), {
      [ChatID + ".lastMessage"]:   {
        text,
        isRead: false 
      },
      [ChatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", adminUID), {
      [ChatID + ".lastMessage"]: {
        text,
        isRead: false 
      },
      [ChatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };
  return (
<div className="input">
  <input
    type="text"
    placeholder="Type something..."
    onChange={(e) => setText(e.target.value)}
    value={text}
    onKeyDownCapture={handleKeyDown}
  />
  <div className="send">
    <button onClick={handleSend}>Send</button>
  </div>
</div>
  )
};

export default Input;
