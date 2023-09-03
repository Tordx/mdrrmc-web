import React , {useEffect , useState} from 'react';
import '../style.css'
import { collection, getDocs } from 'firebase/firestore'
import { db, storage } from '../firebase'
import '../style.css'
import '../newstyle.css'
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { SendNotif } from '../functions';
import ReactModal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { doc , Timestamp  , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Alert = () => {

  // const {currentUser} = useContext(AuthContext)
  const [allData, setAllData] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [warningtime, setWarningTime] = useState('');
  const [alertlocation, setAlertLocation] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addmonitoringModal, setAddmonitoringModal] = useState(false);
  const [database, setDatbase] = useState('landslide');
  const [loading, setloading] = useState(false)
  const [magnitude, setmagnitude] = useState('');
  const [magchoice, setmagchoice] = useState('');
  const [description, setdiscription] = useState('');
  const [image, setimage] = useState('');
  const [imagecolor, setimagecolor] = useState('');
  const [type, settype] = useState('');
  const [icon, seticon] = useState('')

  useEffect(() => {
    const getAllData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, database)); // Replace 'user' with your collection name
        const dataArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllData(dataArray);
      } catch (error) {
        console.error('Error getting data: ', error);
      }
    };

    getAllData();
  }, [database]);

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
      maxHeight: '1000px',
      maxHeight: '1000px',
    },
  };

  const handleMapClick = (coordinates) => {
    setAlertLocation(coordinates)
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

   const handleChoices = (event) => {
    setmagnitude(event.target.value)
  };
  const handleClick = async() => {
    SendNotif(title, message , warningtime)
    try {
        setloading(true)
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
      const earthquakeRef = doc(db, 'notifications' , uuid());
      const notifData = ({
        title: title,
        message: message,
        warningtime: warningtime,
        id: uuid(),
        time: Timestamp.now(),
        image: image,
        alertlocation: alertlocation,

      });
      await setDoc(earthquakeRef , notifData);
      await alertdata()
      console.log('Form data added to Firestore!');
      setloading(false)
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
      setloading(false)
      setModalIsOpen(false);
    }
  }

  const alertdata = async() => {
    setloading(true)
    try {
    const earthquakeRef = doc(db, 'monitoring-alert' , uuid());
    const alertData = ({
          
          title: title,
          description: message,
          warningtime: warningtime,
          id: uuid(),
          imagebackground: imagecolor,
          image: image,
          magnitude: magnitude,
          alertlocation: alertlocation,
          alerttype: type,
        })
      await setDoc(earthquakeRef , alertData);
      setloading(false)
    } catch(error) {
      console.log(error)
      setloading(false)
      setModalIsOpen(false);
      alert('Something went wrong, please try again')
    }
  }

  const monitoringdata = (monitorig) => {
    setDatbase(monitorig)
  }
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeAddMonitoringModal = () => {
    setAddmonitoringModal(false);
  };
 
  const getPropertyToDisplay = (item) => {
    switch (database) {
      case 'weather-monitoring':
        return item.windspeed;
      case 'landslide':
        return item.severity;
      case 'vehicular-accident':
        return item.typeofvehicleinvolve;
      case 'volcanic-eruption':
        return item.duration;
      case 'extreme-drought':
        return item.level;
      case 'tsunami':
        return item.speed;
      case 'tornado':
        return item.duration;
      case 'flood':
        return item.duration;
      case 'heavy-rain':
        return item.duration;
      case 'earthquake':
        return item.depth;
      case 'housefire':
        return item.damage;
      case 'electrical-accident':
        return item.damage;
      default:
        return ''; 
    }
  };
  

  const getHeaderLabel = () => {
    switch (database) {
      case 'weather-monitoring':
        return 'Windspeed';
      case 'landslide':
        return 'Severity';
      case 'vehicular-accident':
        return 'Type of Vehicle';
      case 'volcanic-eruption':
        return 'Duration';
      case 'extreme-drought':
        return 'Level';
      case 'tsunami':
        return 'Speed';
      case 'tornado':
        return 'Duration';
      case 'flood':
        return 'Duration';
      case 'heavy-rain':
        return 'Duration';
      case 'earthquake':
        return 'Depth';
      case 'housefire':
        return 'Damage';
      case 'electrical-accident':
        return 'Damage';
      default:
        return 'Unknown';
    }
  };
  

  const getPropertyToDisplays = (item) => {
    switch (database) {
      case 'weather-monitoring':
        return item.signal;
      case 'landslide':
        return item.damage;
      case 'vehicular-accident':
        return item.damage;
      case 'volcanic-eruption':
        return item.intensity;
      case 'extreme-drought':
        return item.temperature;
      case 'tsunami':
        return item.waterheight;
      case 'tornado':
        return item.windspeed;
      case 'flood':
        return item.waterlevel;
      case 'heavy-rain':
        return item.intensity;
      case 'earthquake':
        return item.magnitude;
      case 'housefire':
        return item.alertlevel;
      case 'electrical-accident':
        return item.cause;
      default:
        return ''; 
    }
  };
  

  const getHeaderLabels = () => {
  switch (database) {
    case 'weather-monitoring':
      return 'Signal';
    case 'landslide':
      return 'Damage';
    case 'vehicular-accident':
      return 'Damage';
    case 'volcanic-eruption':
      return 'Intensity';
    case 'extreme-drought':
      return 'Temperature';
    case 'tsunami':
      return 'WaterHeight';
    case 'tornado':
      return 'Windspeed';
    case 'flood':
      return 'Waterlevel';
    case 'heavy-rain':
      return 'Intensity';
    case 'earthquake':
      return 'Magnitude';
    case 'housefire':
      return 'Alertlevel';
    case 'electrical-accident':
      return 'Cause';
    default:
      return 'Unknown';
  }
};

  return (
    <div className='chatContainer'>
     {loading && <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>}
       <div className="table-responsive">
       <Sidebar menu={sidebar_menu} />
		<div className="table-wrapper">
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Manage<b> Alerts and Notifications</b></h2>
					</div>
					<div className="col-sm-6">
						<a onClick={() => {setModalIsOpen(true)}} href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><span>Send Alert and Notification</span></a>				
						<a onClick={() => {setAddmonitoringModal(true)}} className="btn btn-success" data-toggle="modal"><span>Add Monitoring</span></a>
						<a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><span>Delete</span></a>						
					</div>
				</div>
			</div>
       <div className='selectcontainer'>
        <select  onChange={(e) => monitoringdata(e.target.value)}>
          <option value="">Select an option</option>
          <option value="weather-monitoring">Weather Monitoring</option>
          <option value="volcanic-eruption">Volcanic Eruption</option>
          <option value="tsunami">Tsunami</option>
          <option value="tornado">Tornado</option>
          <option value="flood">Flood</option>
          <option value="heavy-rain">Heavy Rain</option>
          <option value="landslide">Landslide</option>
          <option value="earthquake">Earthquake</option>
          <option value="vehicular-accident">Vehicular Accidents</option>
          <option value="housefire">House Fire</option>
          <option value="electrical-accident">Electrical Accidents</option>
          <option value="extreme-drougth">Extreme Drougth</option>
        </select>
      </div>
      <table className='table'>
  <thead>
      <th>
        Select
      </th>
      <th>{getHeaderLabels()}</th>
      <th>Area</th>
      <th>ID</th>
      <th>Location</th>
      <th>{getHeaderLabel()}</th>
      <th>Title</th>
      <th>Configure</th>
  </thead>
      <tbody>
        {
          allData.map((item, index) => (
          <tr className='' key={index}>
            <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                    <label for="checkbox1"></label>
                  </span>
            </td>
            <td>{getPropertyToDisplays(item)}</td>
            <td>{item.area}</td>
            <td>{item.id}</td>
            <td>{item.location}</td>
            <td>{getPropertyToDisplay(item)}</td>
            <td>{item.title}</td>
            <td>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></a>
            </td>
          </tr>
          ))
        }
      </tbody>
    </table>
  </div>
    </div>
     <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        >
          <h2>Send Alert and Notification</h2>
        <div className="alert-modal-container">
          <div>
            <label htmlFor="title">Alert Warning Level</label>
            <select className='selectcontainer' value={title}
              onChange={(e) => setTitle(e.target.value)}>
              <option disabled value="">Select an option</option>
              <option value = 'Red Warning'>Red Warning</option>
              <option value = 'Orange Warning' >Orange Warning</option>
              <option value = 'Yellow Warning'>Yellow Warning</option>
              <option value = 'Green Warning'>Green Warning</option>
              <option value = 'Blue Warning'>Blue Warning</option>
            </select>
            <label htmlFor="message">Notification Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="date">Until when?</label>
            <input
              type='date'
              id="warningtime"
              value={warningtime}
              onChange={(e) => setWarningTime(e.target.value)}
            />
             <label htmlFor="warningtime">Alert Location</label>
            <input
              id="warningtime"
              value={alertlocation}
              onChange={(e) => setAlertLocation(e.target.value)}
            />
            <label htmlFor="image">Image</label>
            <input
              type='file'
              id="image"
              onChange={handleImageChange}
            />
          </div>
           <div>
            <label htmlFor="imagecolor">Alert Warning Background</label>
            <select id ='imagecolor' className='selectcontainer' value={imagecolor}
              onChange={(e) => setimagecolor(e.target.value)}>
              <option disabled value="">Select an option</option>
              <option value = 'red'>Red</option>
              <option value = 'orange' >Orange</option>
              <option value = 'yellow'>Yellow</option>
              <option value = 'green'>Green</option>
              <option value = 'blue'>Blue</option>
            </select>
            <label htmlFor="message">Alert Description</label>
            <textarea
              id="message"
              value={description}
              onChange={(e) => setdiscription(e.target.value)}
            />
           <label htmlFor="title">Alert Index</label>
            <select className='selectcontainer'
              value={magchoice}
              onChange={(e) => setmagchoice(e.target.value)}>
              <option disabled value="">Select an option</option>
              <option value = 'Magnitude'>Magnitude</option>
              <option value = 'Wave Height' >Wave Height</option>
              <option value = 'Heat Index'>Heat Index</option>
              <option value = 'Flood Level'>Flood Level</option>
            </select>
             <label htmlFor="warningtime">{magchoice}</label>
            {magchoice === 'Magnitude' && <input
              id="warningtime"
              value={magnitude}
              onChange={handleChoices}
            />}
             {magchoice === 'Wave Height' &&
             <input
              id="warningtime"
              value={magnitude}
              onChange= {handleChoices}
            />}
            {magchoice === 'Heat Index' &&<input
              id="warningtime"
              value={magnitude}
              onChange={handleChoices}
            />}
            {magchoice === 'Flood Level' &&<input
              id="warningtime"
              value={magnitude}
              onChange={handleChoices}
            />}
            <label htmlFor="imagecolor">Alert Warning Type</label>
            <select id ='imagecolor' className='selectcontainer' value={type}
              onChange={(e) => settype(e.target.value)}>
              <option disabled value="">Select an option</option>
              <option value = 'flood'>flood</option>
              <option value = 'quake' >quake</option>
              <option value = 'temparature'>temparature</option>
              <option value = 'landslide'>landslide</option>
              <option value = 'drought'>drought</option>
              <option value = 'storm'>storm</option>
              <option value = 'tornado'>tornado</option>
              <option value = 'volcano'>volcano</option>
              <option value = 'wave'>wave</option>
            </select>
           <button onClick={handleClick}>Send</button>
          </div>
        </div>
        </ReactModal>
        <ReactModal
  isOpen={addmonitoringModal}
  onRequestClose={closeAddMonitoringModal}
  contentLabel="Example Modal"
  style={customStyles}
>
  {database === 'earthquake' && <EarthquakeForm isOpen={true} />}
  {database === 'weather-monitoring' && <WeatherMonitoringForm isOpen={true} />}
  {database === 'volcanic-eruption' && <VolcanicEruptionForm isOpen={true} />}
  {database === 'extreme-drougth' && <ExtremeDrougth isOpen={true} />}
  {database === 'tsunami' && <Tsunami isOpen={true} />}
  {database === 'tornado' && <Tornado isOpen={true} />}
  {database === 'flood' && <Flood isOpen={true} />}
  {database === 'heavy-rain' && <HeavyRain isOpen={true} />}
  {database === 'landslide' && <LandSlide isOpen={true} />}
  {database === 'vehicular-accident' && <VehicularAccident isOpen={true} />}
  {database === 'housefire' && <HouseFire isOpen={true} />}
  {database === 'electrical-accident' && <ElectricalAccident isOpen={true} />}
</ReactModal>
      </div>
    );
};

export default Alert;