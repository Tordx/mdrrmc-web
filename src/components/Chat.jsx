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
import VolcanicEruptionForm from "../forms/VolcanicEruptionForm";
import ExtremeDrougth from "../forms/ExtremeDrougth";
import Tsunami from "../forms/TsunamiFrom";
import Tornado from "../forms/TornadoForm";
import Flood from "../forms/FloodForm";
import HeavyRain from "../forms/HeavyRainForm";
import LandSlide from "../forms/LandSlideForm";
import VehicularAccident from "../forms/VehicularAccidentForm";
import HouseFire from "../forms/HouseFire";
import ElectricalAccident from "../forms/ElectricalAccident";
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";

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
  const [activeModal, setActiveModal] = useState(null);
  const barColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78'];

  const [dataset, setDataSet] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 
    'October', 'November' , 'December'],
    datasets: [
      {
        label: 'Data',
        data: [0, 0, 0, 0, 0, 0, 0, 0 ,0 , 0 ,0 , 0],
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
      },
    ],
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

  const options = {

  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBoxClick = async (monitoring) => {
    try {
      const docRef = doc(db, 'chartDataset', monitoring);
      const docSnapshot = await getDoc(docRef);
      setDataSet(docSnapshot.data());
      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
    setActiveModal(monitoring);
  };
  
  const handleLongPress = (monitoring) => {
    console.log('handleLongPress:', monitoring);
    setModalIsOpen(true);
    // Additional code for handling long press event
  };

  const longPressEvent = LongPress(
    () => handleLongPress(activeModal), // Pass the activeModal value to handleLongPress
    1000,
    activeModal // Pass the activeModal value to the LongPress hook
  );
  
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
          data = {dataset}
          options={options}
          ></Bar>
      </div> 
     <div className="myAdminDashboard2" onClick={() => handleBoxClick('red')}>

     <Pie data={dataset}
       style={{padding: 25}}
      options={options}>
          
          </Pie>
     </div>
      
      </div>
    </div>
      <div className="head">
      <h1>Monitoring</h1>
      </div>
      <div className = 'boxcontainers' >
      <div className="boxrecontain">
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('weathermonitoring')}}>
        <img src={weather} width={'70%'} height={'70%'} />
        <h5>Weather Monitoring</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('volcaniceruption')}}>
        <img src= {volcano} width={'70%'} height={'70%'} />
        <h5>Volcanic Eruption</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('extremedrougth')}}>
      <img src= {drought} width={'70%'} height={'70%'} />
        <h5>Extreme Drought</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('tsunami')}}>
      <img src= {tsunami} width={'70%'} height={'70%'} />
        <h5>Tsunami</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('tornado')}}>
      <img src= {tornado} width={'70%'} height={'70%'} />
        <h5>Tornado</h5>
      </div>  
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('flood')}}>
      <img src= {flood} width={'70%'} height={'70%'} />
        <h5>Flood</h5>
      </div>
      </div>
      <div className="boxrecontain">
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('heavyrain')}}>
      <img src= {rain} width={'70%'} height={'70%'} />
        <h5>Heavy rain</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('landslide')}}>
      <img src= {slide} width={'70%'} height={'70%'} />
        <h5>Landslide</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('earthquick')} {...longPressEvent}>
        <img src={earthquake} width={'70%'} height={'70%'} />
        <h5>Earthquick</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('vehicularaccident')}}>
      <img src= {vehicleacc} width={'70%'} height={'70%'} />
        <h5>Vehicular Accident</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('housefire')}}>
      <img src= {housefire} width={'70%'} height={'70%'} />
        <h5>House fires</h5>
      </div>
      <div className="monitoringbutton" {...longPressEvent} onClick={() => {  handleBoxClick('electricalaccident')}}>
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
  {activeModal === 'earthquick' && <EarthQuickForm isOpen={true} />}
  {activeModal === 'weathermonitoring' && <WeatherMonitoringForm isOpen={true} />}
  {activeModal === 'volcaniceruption' && <VolcanicEruptionForm isOpen={true} />}
  {activeModal === 'extremedrougth' && <ExtremeDrougth isOpen={true} />}
  {activeModal === 'tsunami' && <Tsunami isOpen={true} />}
  {activeModal === 'tornado' && <Tornado isOpen={true} />}
  {activeModal === 'flood' && <Flood isOpen={true} />}
  {activeModal === 'heavyrain' && <HeavyRain isOpen={true} />}
  {activeModal === 'landslide' && <LandSlide isOpen={true} />}
  {activeModal === 'vehicularaccident' && <VehicularAccident isOpen={true} />}
  {activeModal === 'housefire' && <HouseFire isOpen={true} />}
  {activeModal === 'electricalaccident' && <ElectricalAccident isOpen={true} />}
    {/* <EarthQuickForm/> */}
    {/* <Weather/> */}
     {/* <Messages/>
      <Input/> */}
</ReactModal>
  </div>
  );
};

export default Chat;
