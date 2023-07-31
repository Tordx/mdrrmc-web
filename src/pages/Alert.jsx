import React , {useEffect , useState} from 'react';
import '../style.css'
import Navbar from '../components/navbar/sidebar';
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import '../style.css'
import '../newstyle.css'
import axios from 'axios';
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { SendNotif } from '../functions';
import ReactModal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteForeverOutlined, SendOutlined } from '@mui/icons-material';
import { faDeleteLeft, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import Maplocation from '../components/maplocation';

const Alert = () => {

  // const {currentUser} = useContext(AuthContext)
  const [allData, setAllData] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [warningtime, setWarningTime] = useState('');
  const [alertlocation, setAlertLocation] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [database, setDatbase] = useState('landslide');

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleWarningTimeChange = (event) => {
    setWarningTime(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const openCoordinatesModat = () => {
    setOpenMap(true)
  };
  const closeCoordinatesModal = () => {
    setOpenMap(false)
  };

  const handleClick = async() => {
    SendNotif(title, message , warningtime)
    try {
      // Add the form data to Firestore
      const earthquakeRef = doc(db, 'notifications' , uuid()); // Replace 'earthquakes' with your collection name
      const notifData = ({
        title: title,
        message: message,
        warningtime: warningtime,
        id: uuid(),
        time: Timestamp.now(),
        alertlocation: alertlocation,

      });
      await setDoc(earthquakeRef , notifData);

      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  }
  const monitoringdata = (monitorig) => {
    setDatbase(monitorig)
  }
  const closeModal = () => {
    setModalIsOpen(false);
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
      // Add cases for other databases if needed
      default:
        return ''; // Return some default value if the database doesn't match any case
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
      // Add cases for other databases if needed
      default:
        return ''; // Return some default value if the database doesn't match any case
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
    // Add cases for other databases if needed
    default:
      return 'Unknown'; // Return some default label if the database doesn't match any case
  }
};

  return (
    <div className='chatContainer'>
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
        {allData.map((item, index) => (
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
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><FontAwesomeIcon  icon={faPenSquare}></FontAwesomeIcon></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></a>
            </td>
          </tr>
        ))}
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
        <div className="container">
        <div className="modal-content">
          <h3>Alert</h3>
          <div className="content1">
            <label htmlFor="title">Title:</label>
            <textarea
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
            />
            <label htmlFor="warningtime">Warning Time:</label>
            <textarea
              id="warningtime"
              value={warningtime}
              onChange={handleWarningTimeChange}
            />
             <button onClick={openCoordinatesModat}>Get Location</button>
          </div>
          <button onClick={handleClick}>Send Notification</button>
        </div>
      <ReactModal
        isOpen={openMap}
        onRequestClose={closeCoordinatesModal}
        contentLabel="Get Coordinates"
        style={customStyles}
        >
         <Maplocation
         onMapClick={handleMapClick}
         />
        </ReactModal>
    </div>
        </ReactModal>
  </div>
    );
};

export default Alert;