import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import '../style.css'
import { Chart,
   BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend, } from "chart.js";
import { Bar , Line, Pie } from "react-chartjs-2";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
)


const Chat = () => {
  const { data } = useContext(ChatContext);

  const datas = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'November' , 'December'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 9, 10 ,6 , 3 ,5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataspie = {
    labels: ['January', 'February', 'March',],
    datasets: [
      {
        // label: 'Sales',
        data: [12, 19, 3],
        backgroundColor: ['red' , 'blue' , 'yellow'],
        // borderColor: 'rgba(75, 192, 192, 1)',
        // borderWidth: 1,
      },
    ],
  };


  const options = {

  }
  

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
        
     <div className="myAdminDashboard1" onClick={() => handleBoxClick('red')}>
          <Bar
          style={{width: '100%'}}
          data = {datas}
          options={options}
          ></Bar>
      </div> 
     <div className="myAdminDashboard2" onClick={() => handleBoxClick('red')} />
         {/* <Pie
          // style={{width: '200px'}}
          data = {dataspie}
          options={options}
          ></Pie> */}
      </div>
    </div>
      <div className="chatInfo">
      <h2>Monitoring</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>  
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      <div className="myMonitoring" onClick={() => handleBoxClick('red')}>
        <p>This is the text inside the box</p>
      </div>
      </div>
    </div>
      {/* <Messages/>
      <Input  /> */}
  </div>
  );
};

export default Chat;
