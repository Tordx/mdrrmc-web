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

const Alert = () => {

  // const {currentUser} = useContext(AuthContext)
  const [allData, setAllData] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    SendNotif(title, message)
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
      // Add cases for other databases if needed
      default:
        return ''; // Return some default value if the database doesn't match any case
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
       return 'Damage ';
      case 'volcanic-eruption':
       return 'Intensity ';
      // Add cases for other databases if needed
      default:
        return 'Unknown'; // Return some default label if the database doesn't match any case
    }
  };

  const getHeaderLabel = () => {
    switch (database) {
      case 'weather-monitoring':
        return 'Windspeed';
      case 'landslide':
        return 'Severity';
      case 'vehicular-accident':
        return 'Type of Vehicle ';
       case 'volcanic-eruption':
        return 'Duration ';
      default:
        return 'Unknown';
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
          <option value="house-fire">House Fire</option>
          <option value="electrical-accidents">Electrical Accidents</option>
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
            <input
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
          </div>
          <button onClick={handleClick}>Send Notification</button>
        </div>
    </div>
        </ReactModal>
  </div>
    );
};

export default Alert;