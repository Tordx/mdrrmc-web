import React, { useContext , useEffect, useState } from "react";
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
import EarthquakeForm from "../forms/EarthquakeForm";
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
import { doc, getDoc, getDocs , collection , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import Maplocation from "./maplocation";
import { useDispatch } from "react-redux";
import allActions from "../redux/actions/indexAction";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
)


const Chat = () => {

  const dispatch = useDispatch()
  const { data } = useContext(ChatContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [initialMarker, setInitialMarker] = useState();
  // const initialMarkers = [
  //   [120.2307078878246, 16.032108026014853], // Marker 1 coordinates (e.g., [120.2307078878246, 16.032108026014853])
  //   [120.25, 16.05], // Marker 2 coordinates (e.g., [120.25, 16.05])
  //   // Add more markers as needed
  // ];
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
      minWidth: '100%',
      minHeight: '100%',
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
      console.log(docSnapshot);
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
    setActiveModal(monitoring);
  };

  const Initaldata = async() => {
    try {
      const docRef = doc(db, 'chartDataset', 'weather-monitoring');
      const docSnapshot = await getDoc(docRef);
      setDataSet(docSnapshot.data());
      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
    setActiveModal('weathermonitoring');
  };
  
  const handledoubleclick = async(monitoring) => {
    console.log('am i pressed');
    dispatch(allActions.userAction.setMonitoring(monitoring))
    console.log('handleLongPress:', monitoring);
      try {
        const querySnapshot = await getDocs(collection(db, monitoring)); 
        const dataArray = querySnapshot.docs.map((doc) => ({ coordinates: doc.data().coordinates }));
        console.log(dataArray);
        console.log(Array.isArray(dataArray));
        const convertedData = dataArray.map((item) => item.coordinates);
        setInitialMarker(convertedData)
      } catch (error) {
        console.error('Error getting data: ', error);
      }
     setModalIsOpen(true);
    
  };

  useEffect(() => {
    Initaldata()
  },[])

    const handleMapClick = (coordinates) => {
    console.log('Map clicked:', coordinates);
    // Do something with the coordinates when the map is clicked
  };
  
  return (
    <>
    {modalIsOpen ?
        <>
        <Maplocation
        onMapClick={handleMapClick}
        initialMarker={initialMarker}
        />
        <button onClick={() => setModalIsOpen(false)} className="gobackbutton">Back</button>
        </> : <div className="dashboard">
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
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('weather-monitoring')}}>
        <img src={weather} width={'70%'} height={'70%'} />
        <h5>Weather Monitoring</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('volcanic-eruption')}}>
        <img src= {volcano} width={'70%'} height={'70%'} />
        <h5>Volcanic Eruption</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('extreme-drougth')}}>
      <img src= {drought} width={'70%'} height={'70%'} />
        <h5>Extreme Drought</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('tsunami')}}>
      <img src= {tsunami} width={'70%'} height={'70%'} />
        <h5>Tsunami</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('tornado')}}>
      <img src= {tornado} width={'70%'} height={'70%'} />
        <h5>Tornado</h5>
      </div>  
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('flood')}}>
      <img src= {flood} width={'70%'} height={'70%'} />
        <h5>Flood</h5>
      </div>
      </div>
      <div className="boxrecontain">
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('heavy-rain')}}>
      <img src= {rain} width={'70%'} height={'70%'} />
        <h5>Heavy rain</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('landslide')}}>
      <img src= {slide} width={'70%'} height={'70%'} />
        <h5>Landslide</h5>
      </div>
      <div className="monitoringbutton" onClick={() => handleBoxClick('earthquake')} onDoubleClick={() => handledoubleclick(activeModal)}>
        <img src={earthquake} width={'70%'} height={'70%'} />
        <h5>Earthquake</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('vehicular-accident')}}>
      <img src= {vehicleacc} width={'70%'} height={'70%'} />
        <h5>Vehicular Accident</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('housefire')}}>
      <img src= {housefire} width={'70%'} height={'70%'} />
        <h5>House fires</h5>
      </div>
      <div className="monitoringbutton" onDoubleClick={() => handledoubleclick(activeModal)} onClick={() => {  handleBoxClick('electrical-accident')}}>
      <img src= {elecacc} width={'70%'} height={'70%'} />
        <h5>Electrical Accidents</h5>
      </div>
      </div>
    </div>
    
    </div>
    }
    </>
  );
};

export default Chat;
