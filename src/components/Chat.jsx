import React, { useContext , useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import '../style.css'
import '../newstyle.css'
import { Chart,
   BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend, } from "chart.js";
import { Bar , Line, Pie } from "react-chartjs-2";
import ReactModal from "react-modal";
import weather from "../img/img/x8zsjTm.png"
import volcano from "../img/img/FD28ReG.png"
import drought from  "../img/img/cTXjmXp.png"
import tsunami from  "../img/img/EouQDuS.png"
import rain from  "../img/img/qlStI1C.png"
import tornado from  "../img/img/OsUBFui.png"
import flood from  "../img/img/9mkRbrF.png"
import slide from '../img/img/GXQhrpc.png'
import earthquake from '../img/img/PmNFMqc.png'
import vehicleacc from '../img/img/6hkpBfL.png'
import housefire from '../img/img/eQ8MoBj.png'
import elecacc from '../img/img/wg409Ru.png'
import LongPress from "./LongPress";
import EarthQuickForm from "../forms/EarthQuickForm";
import WeatherMonitoringForm from "../forms/WeatherMonitoringForm";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    depth: '',
    id: '',
    location: '',
    magnitude: '',
    time: '',
    title: '',
  });

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
      minWidth: '700px',
      maxWidth: '700px',
      maxHeight: '700px',
      maxHeight: '700px',
    },
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, like submitting it to an API or performing some action.
    console.log(formData);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  const handleBoxClick = (boxColor) => {
    console.log(`Clicked on ${boxColor} box!`);
  };

  const handleLongPress = (boxColor) => {
    setModalIsOpen(true)
    console.log(`Long press on ${boxColor}!`);
  };

  const longPressEvent = LongPress(() => handleLongPress('red'), 1000);


  return (
    <div className="dashboard">
       <div className="head">
      <h1 >Admin Dashboard</h1>
      
      <h4 >Real-time Visualization</h4>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginLeft: 20 }}>
         
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        
     <div className="myAdminDashboard1" onClick={() => handleBoxClick('red')}>
          <Bar
          style={{padding: 25, width: '100%'}}
          data = {datas}
          options={options}
          ></Bar>
      </div> 
     <div className="myAdminDashboard2" onClick={() => handleBoxClick('red')}>

     <Pie data={datas}
       style={{padding: 25}}
      options={options}>
          
          </Pie>
     </div>
      
      </div>
    </div>
      <div className="head">
      <h1>Monitoring</h1>
      </div>
      <div classname = 'boxcontainers' >
      <div className="boxrecontain">
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')} {...longPressEvent}>
        <img src={weather} width={'70%'} height={'70%'} />
        <h5>Weather Monitoring</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
        <img src= {volcano} width={'70%'} height={'70%'} />
        <h5>Volcanic Eruption</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {drought} width={'70%'} height={'70%'} />
        <h5>Extreme Drought</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {tsunami} width={'70%'} height={'70%'} />
        <h5>Tsunami</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {tornado} width={'70%'} height={'70%'} />
        <h5>Tornado</h5>
      </div>  
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {flood} width={'70%'} height={'70%'} />
        <h5>Flood</h5>
      </div>
      </div>
      <div className="boxrecontain">
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {rain} width={'70%'} height={'70%'} />
        <h5>Heavy rain</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {slide} width={'70%'} height={'70%'} />
        <h5>Landslide</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')} {...longPressEvent}>
        <img src={earthquake} width={'70%'} height={'70%'} />
        <h5>Earthquick</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {vehicleacc} width={'70%'} height={'70%'} />
        <h5>Vehicular Accident</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {housefire} width={'70%'} height={'70%'} />
        <h5>House fires</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('red')}>
      <img src= {elecacc} width={'70%'} height={'70%'} />
        <h5>Electrical Accidents</h5>
      </div>
      </div>
    </div>
    <ReactModal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Example Modal"
  style={customStyles}
>
    <EarthQuickForm/>
    <Weather/>
     {/* <Messages/>
      <Input/> */}
</ReactModal>
  </div>
  );
};

export default Chat;
