import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import '../style.css'
const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <img  src={ data.user.photoURL} alt="" />
        <h4>{data.user?.FullName?.charAt(0).toUpperCase() + data.user?.FullName?.slice(1)}</h4>
      </div>
      <Messages/>
      <Input  />
  </div>
  );
};

export default Chat;
