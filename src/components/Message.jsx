import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import '../style.css'
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
    <div className="messageInfo">
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
        alt=""
      />
    </div>
    <div className="messageContent">
      <p>{message.message}</p>
      {message.img && <img src={message.img} alt="" />}
      <span>
      {message.chattime} — {message.chatdate} 
      </span>
    </div>
  </div>
  );
};

export default Message;
