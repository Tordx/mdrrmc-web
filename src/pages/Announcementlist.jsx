
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {calculateRange, sliceData} from '../components/pagination';
import { collection, getDocs , doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import '../style.css'
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import allActions from '../redux/actions/indexAction';




const Annoucementlist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [filteredAnnouncements, setFilteredAnnouncement] = useState([]);
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [sort, setSort] = useState('');

    useEffect(() => {
        setPagination(calculateRange(filteredAnnouncements, 10));
        setFilteredAnnouncement(sliceData(filteredAnnouncements, page, 10));
    }, []);

    useEffect(() => {
      data()
  }, [])

    const data = async() => {

      const querySnapshot = await getDocs(collection(db, "announcement"));
      const thisdata = []
      querySnapshot.forEach((doc) => {

        thisdata.push({
          docId: doc.id,
          userID : doc.data().userID,
          eventname : doc.data().eventname,
          email: doc.data().email,
          starttime: doc.data().starttime,
          endtime: doc.data().endtime,
          startofevent: doc.data().startofevent,
          endofEvent: doc.data().endofEvent,
          batchCode: doc.data().batchCode,
          eventplace:  doc.data().eventplace,
          status:  doc.data().Status,
          photoURL: doc.data().photoURL,
          phoneNumber: doc.data().phoneNumber,
          landlineNumber: doc.data().landlineNumber,
          department: doc.data().department,
          eventdecs: doc.data().eventdecs,
          chatdate: doc.data().chatdate,
          chattime: doc.data().chattime,
          
         })
      });
        thisdata.sort((a, b) => new Date(b.date) - new Date(a.date))
        setFilteredAnnouncement(thisdata)
    }
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value) {
            let search_results = filteredAnnouncements.filter((item) =>
                (new RegExp(event.target.value, 'i').test(item.eventname) ||
                new RegExp(event.target.value, 'i').test(item.department) ||
                new RegExp(event.target.value, 'i').test(item.email)
                )
            );
            setFilteredAnnouncement(search_results);
        }
        else if (event.target.value == '') {
            data()
        }
    };

    const handleSort = (event) => {
        setSort(event.target.value);
        if (event.target.value) {
          let sortedEvent = [...filteredAnnouncements];
          switch (event.target.value) {
            case "Alphabetical":
              sortedEvent.sort((a, b) => (a.eventname > b.eventname ? 1 : -1));
              break;
            case "Department":
              sortedEvent.sort((a, b) => (a.department > b.department ? 1 : -1));
              break;
            case "startofevent":
              sortedEvent.sort((a, b) => (a.startofevent > b.startofevent ? 1 : -1));
              break;
            case "endofevent":
                sortedEvent.sort((a, b) => (a.eventofevent > b.eventofevent ? 1 : -1));
              break;
            case "eventplace":
                sortedEvent.sort((a, b) => (a.eventplace > b.eventplace ? 1 : -1));
                break;  
            case "Status":
              sortedEvent.sort((a, b) => (a.Status > b.Status ? 1 : -1));
              break;
            default:
              break;
          }
          console.log(sortedEvent);
          setFilteredAnnouncement(sortedEvent);
          console.log(filteredAnnouncements);
        } else if (event.target.value === "") {
          data();
        }
      };
      
    const __handleChangeStatus = async(user) => {
      dispatch(allActions.userAction.setAnnoucement(user))
      navigate("/admin/approvingannoucementform")
  };
  return (
    <>
    
          
      
    <Header/>
    <div className='formContainer'>
         {isExpanded && (
            <div className='photo-overlay' onClick={() => setIsExpanded(false)}>
                <div className='photo-wrapper'>
                <img src={filteredAnnouncements[selectedPhotoIndex]?.photoURL} alt='user' style={{width: '50%', height: '50%' }} />
                </div>
            </div>
            )}
        <div className='formWrapper'>
        <div className='LabelWrapper'>
        <div className='dashboard-content-container'>
          <div className='HeadForm'>
        <div className="row-label">
              <h2>
                <label>ANNOUCEMENT LIST</label>
              </h2>
              </div>
                    <div className='row-label'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            onChange={e => __handleSearch(e)}
                        />
                    </div>
                </div>
                <div className='page-label'>
                <a href="annoucementform">ADD ANNOUCEMENT</a>
                
                <select value={sort} onChange={e => handleSort(e)}>
                    <option value="Alphabetical">Sort by</option>
                    <option value="Department">Department</option>
                    <option value="startofevent">Start of Event</option>
                    <option value="endofevent">End of Event</option>
                    <option value="eventplace">Event Place</option>
                    <option value="Status">Status</option>
                </select>
                </div>
                <table  className='dashboard-content-table'>
                    <thead>
                        <th>ANNOUCEMENT TITLE</th>
                        <th>ANNOUCEMENT DESC</th>
                        <th>DEPARTMENT</th>
                        <th>START OF THE EVENT</th>
                        <th>END OF THE EVENT</th>
                        <th>EVENT PLACE</th>
                        <th>EMAIL</th>
                        <th>PHOTO</th>
                        <th>STATUS</th>
                        <th>UPDATE</th>
                    </thead>
                    {filteredAnnouncements.length !== 0 ?
                        <tbody>
                            {filteredAnnouncements.map((user, index) => (
                                <tr key={index}>
                                    <td><span>{user.eventname}</span></td>
                                    <td><span>{user.eventdecs}</span></td>
                                    <td><span>{user.department}</span></td>
                                    <td> <span> {user.starttime} — {user.startofevent}</span></td>
                                    <td> <span> {user.endtime} — {user.endofEvent}</span></td>
                                    <td><span>{user.eventplace}</span></td>
                                    <td><span>{user.activestatus}</span></td>
                                    <td onClick={() => {setIsExpanded(true);  setSelectedPhotoIndex(index);}}><img  style={{ height: '80px', width: '80px' }} src={user.photoURL} alt={user.photoURL} /></td>
                                    <td><span>{user.status}</span></td>
                                    <td><span><button onClick={() => {__handleChangeStatus(user)}}>Edit</button></span></td>
                                </tr>
                            ))}
                        </tbody>
                    : <h1>NO DATA</h1>}
                </table>
            </div>
            </div>
            </div>
        </div>
        </>
  )
};

export default Annoucementlist;
