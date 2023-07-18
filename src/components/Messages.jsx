import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import '../style.css'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext); 
  const userUID = data.user.uid
  const adminUID = "mdrNgqcK8NPADFBCQqIa";
  const ChatID = adminUID.concat(userUID);


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", ChatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.length > 0 ? 
        (
          messages.map((m) => (
            <Message message={m} key={m.id} />
          ))
        ) : 
        (
        <p>No messages available.</p>
        )
      }
    </div>
  );
};

export default Messages;
