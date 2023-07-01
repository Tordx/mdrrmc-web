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

  const handleBoxClick = (boxColor) => {
    console.log(`Clicked on ${boxColor} box!`);
    // Perform additional actions on box click
  };


  return (
    <div className="chat">
       <div className="chatInfo">
      <h2 >Admin Dashboard</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
         <h4>Real Time Data Virtualization </h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <div
          style={{ width: '400px', height: '150px', backgroundColor: 'red', cursor: 'pointer' , marginRight: 100 }}
          onClick={() => handleBoxClick('red')}
        />
        <div
          style={{ width: '150px', height: '150px', backgroundColor: 'green', cursor: 'pointer' }}
          onClick={() => handleBoxClick('green')}
        /> */}
        
     <div className="myAdminDashboard1" onClick={() => handleBoxClick('red')} />
     <div className="myAdminDashboard2" onClick={() => handleBoxClick('red')} />
       
      </div>
    </div>
      <div className="chatInfo">
      <h2>Monitoring</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />

       
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />
      <div className="myMonitoring" onClick={() => handleBoxClick('red')} />

      </div>
    </div>
      {/* <Messages/>
      <Input  /> */}
  </div>
  );
};

export default Chat;
