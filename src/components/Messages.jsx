import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import '../style.css'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext); 

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", "mdrNgqcK8NPADFBCQqIa0WExfTKqtpb2Neu86MtX6YaIRM92"), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log('dataMessage');
  console.log(data);
  console.log("dataMessage");
  console.log('messages');
  console.log(messages);
  console.log("messages");


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
