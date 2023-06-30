
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { collection, getDocs , doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import '../style.css'
import { useDispatch } from 'react-redux';
import allActions from '../redux/actions/indexAction';
import { useNavigate } from 'react-router-dom';
import generateRandomString from '../components/autogeneratenumber';


const ApplicationList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [users, setUser] = useState([]);
    const [sort, setSort] = useState('');
    const [disabilityCode, setDisabilityCode] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
       
      data()
   
  }, [])

  const data = async() => {

    const querySnapshot = await getDocs(collection(db, "users"));
    const thisdata = []
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if(doc.data().Status !== 'Active'){
    thisdata.push({
      docId: doc.id,
      userID : doc.data().userID,
      FullName : doc.data().FullName,
      email: doc.data().email,
      password: doc.data().password,
      typeOfDisability: doc.data().typeOfDisability,
      birthDate: doc.data().birthDate,
      batchCode: doc.data().batchCode,
      disabilityCode:  doc.data().disabilityCode,
      status:  doc.data().Status,
      ApprovingOfficer:  doc.data().ApprovingOfficer,
      Encoder:  doc.data().Encoder,
      Father:  doc.data().Father,
      Guardian:  doc.data().Guardian,
      License:  doc.data().License,
      Mother:  doc.data().Mother,
      Physician:  doc.data().Physician,
      ProcessingOfficer:  doc.data().ProcessingOfficer,
      address:  doc.data().address,
      causeOfDisability:  doc.data().causeOfDisability,
      date:  doc.data().date,
      employmentStatus:  doc.data().employmentStatus,
      highestEducation:  doc.data().highestEducation,
      landlineNumber:  doc.data().landlineNumber,
      phoneNumber:  doc.data().phoneNumber,
      sex:  doc.data().sex,
      uid:  doc.data().uid,
      userType:  doc.data().userType,
      dl:  doc.data().dl,
      gsis:  doc.data().gsis,
      others:  doc.data().others,
      occupation:  doc.data().occupation,
      pagibig:  doc.data().pagibig,
      philhealth:  doc.data().philhealth,
      psn:  doc.data().psn,
      sss:  doc.data().sss,
      specDis:  doc.data().specDis,
      occupation:  doc.data().occupation,
      emergencyContactPerson:  doc.data().emergencyContactPerson,
      emergencyContactNumber:  doc.data().emergencyContactNumber,
      photoURL: doc.data().photoURL,
      Status: doc.data().Status,
      file: doc.data().file,
      street: doc.data().street,
      barangay: doc.data().barangay
      
      
      })
  }
  });
  thisdata.sort((a, b) => new Date(b.date) - new Date(a.date))
  setUser(thisdata);
  setFilteredUsers(thisdata)

  }

  const handleSort = (event) => {
      setSort(event.target.value);
      if (event.target.value === 'male') {
        let sortedEvent = users.filter((item) =>
          item.sex === 'male'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'female') {
        let sortedEvent = users.filter((item) =>
        item.sex === 'female'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Others') {
          let sortedEvent = users.filter((item) =>
          item.sex === 'Others'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
        } else if (event.target.value === "") {
        data()
      }
    };

    const handlestatus = (event) => {
      setSort(event.target.value);
      if (event.target.value === 'New Application') {
        let sortedEvent = users.filter((item) =>
          item.Status === 'New Application'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Pending') {
        let sortedEvent = users.filter((item) =>
        item.Status === 'Pending'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Denied') {
          let sortedEvent = users.filter((item) =>
          item.Status === 'Denied'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
        } else if (event.target.value === 'Deactivated') {
          let sortedEvent = users.filter((item) =>
          item.Status === 'Deactivated'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
        }  else if (event.target.value === "") {
        data()
      }
    };




    const handleaddress = (event) => {
      setAddress(event.target.value);
      if (event.target.value === 'Bolo') {
        let sortedEvent = users.filter((item) =>
          item.barangay === 'Bolo'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Bongalon') {
        let sortedEvent = users.filter((item) =>
        item.barangay === 'Bongalon'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Dulig') {
          let sortedEvent = users.filter((item) =>
          item.barangay === 'Dulig'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Laois') {
          let sortedEvent = users.filter((item) =>
          item.barangay === 'Laois'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Magsaysay') {
          let sortedEvent = users.filter((item) =>
          item.barangay === 'Magsaysay'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Poblacion') {
        let sortedEvent = users.filter((item) =>
          item.barangay === 'Poblacion'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'San Gonzalo') {
        let sortedEvent = users.filter((item) =>
        item.barangay === 'San Gonzalo'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'San Jose') {
        let sortedEvent = users.filter((item) =>
        item.barangay === 'San Jose'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Tobuan') {
        let sortedEvent = users.filter((item) =>  
        item.barangay === 'Tobuan'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Uyong') {
        let sortedEvent = users.filter((item) =>
        item.barangay === 'Uyong'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === "") {
        data()
      }
    };
      
    const handledisabilitysort = (event) => {
      setDisabilityCode(event.target.value);
      if (event.target.value === 'Vision Impairment') {
        let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Vision Impairment'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Deaf or hard of hearing') {
        let sortedEvent = users.filter((item) =>
        item.typeOfDisability === 'Deaf or hard of hearing'
        );
        console.log(sortedEvent);
        setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Mental health conditions') {
          let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Mental health conditions'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent);
      } else if (event.target.value === 'Intellectual disability') {
          let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Intellectual disability'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent); 
      } else if (event.target.value === 'Acquired brain injury') {
          let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Acquired brain injury'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent); 
      } else if (event.target.value === 'Autism spectrum disorder') {
          let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Autism spectrum disorder'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent); 
      } else if (event.target.value === 'Physical disability') {
          let sortedEvent = users.filter((item) =>
          item.typeOfDisability === 'Physical disability'
          );
          console.log(sortedEvent);
          setFilteredUsers(sortedEvent); 
      } else if (event.target.value === "") {
        data()
      }
    };
   
  const __handleSearch = (event) => {
      setSearch(event.target.value);
      if (event.target.value) {
          let search_results = users.filter((item) =>
              (new RegExp(event.target.value, 'i').test(item.userID) ||
              new RegExp(event.target.value, 'i').test(item.FullName) ||
              new RegExp(event.target.value, 'i').test(item.email) ||
              new RegExp(event.target.value, 'i').test(item.sex) ||
              new RegExp(event.target.value, 'i').test(item.typeOfDisability) ||
              new RegExp(event.target.value, 'i').test(item.Status) ||
              new RegExp(event.target.value, 'i').test(item.batchCode) ||
              new RegExp(event.target.value, 'i').test(item.address) 

              
              )
          );
          setFilteredUsers(search_results);
          
      } else {
          data();
      }
  };

  
  const __handleChangeStatus = async (user) => {
    generateRandomString();
    const id = generateRandomString()
    dispatch(allActions.userAction.setUser(user));
    const uniqueURL = `/admin/approvingform/${encodeURIComponent(user.FullName)}?${user.userID}-${user.uid}?${id.toString()}`;
    localStorage.setItem("formSubmitted", "true");
    navigate(uniqueURL);
  };


  return (
    <div className='formContainer'>
       {isExpanded && (
            <div className='photo-overlay' onClick={() => setIsExpanded(false)}>
                <div className='photo-wrapper'>
                <img src={filteredUsers[selectedPhotoIndex]?.photoURL} alt='user' style={{width: '20%', height: '20%' }} />
                </div>
            </div>
            )}
        <Header/>
        <div className='formWrapper'>
        <div className='LabelWrapper'>
        <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                <div className="row-label">
              <h2>
                <label>APPLICATION LIST</label>
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
                <a href="form">ADD USERS</a>
                <div>
                <select value={sort} onChange={sort => handleSort(sort)}>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="Others">Others</option>
                </select>
                    <select name="disabilityCode" value={disabilityCode} onChange={(e) => handledisabilitysort(e)}>
                      <option value="">Disability</option>
                      <option value="Vision Impairment">Vision Impairment</option>
                      <option value="Deaf or hard of hearing">Deaf or hard of hearing</option>
                      <option value="Mental health conditions">Mental health conditions</option>
                      <option value="Intellectual disability">Intellectual disability</option>
                      <option value="Acquired brain injury">Acquired brain injury</option>
                      <option value="Autism spectrum disorder">Autism spectrum disorder</option>
                      <option value="Physical disability">Physical disability</option>
                    </select>
                      <select required type="text" name="barangay/town" value={address} onChange={(e) => handleaddress(e)}>
                          <option value="">Address</option>
                          <option value="Bolo">Bolo</option>
                          <option value="Bongalon">Bongalon</option>
                          <option value="Dulig">Dulig</option>
                          <option value="Laois">Laois</option>
                          <option value="Magsaysay">Magsaysay</option>
                          <option value="Poblacion">Poblacion</option>
                          <option value="San Gonzalo">San Gonzalo</option>
                          <option value="San Jose">San Jose</option>
                          <option value="Tobuan">Tobuan</option>
                          <option value="Uyong">Uyong</option>
                      </select>
                <select value={sort} onChange={(sort) => handlestatus(sort)}>
                    <option value="">Status</option>
                    <option value="New Application">New Application</option>
                    <option value="Deactivated">Deactivated</option>
                    <option value="Denied">Denied</option>
                    <option value="Pending">Pending</option>
                </select>
                </div>
                </div>
                <table  className='dashboard-content-table'>
                    <thead>
                        <th>BATCH CODE</th>
                        <th>USER ID</th>
                        <th>DISABILITY CODE</th>
                        <th>USER PROFILE</th>
                        <th>FULLNAME</th>
                        <th>GENDER</th>
                        <th>ADDRESS</th>
                        <th>EMAIL</th>                       
                        <th>TYPE OF DISABILITY</th>
                        <th>USER STATUS</th>
                        <th>ACCOUNT CREATED</th>
                        <th>UPDATE USER</th>
                    </thead>

                    {filteredUsers.length !== 0 ?
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td><span>{user.batchCode}</span></td>
                                    <td><span>{user.userID}</span></td>
                                    <td><span>{user.disabilityCode}</span></td>
                                    <td onClick={() => {setIsExpanded(true);  setSelectedPhotoIndex(index);}}><img  style={{ height: '80px', width: '80px' }} src={user.photoURL} alt={user.photoURL} /></td>
                                    <td><span>{user.FullName}</span></td>
                                    <td><span>{user.sex}</span></td>
                                    <td> <span>{user.address}</span></td>
                                    <td> <span>{user.email}</span></td>                                   
                                    <td><span> {Array.isArray(user.typeOfDisability) ? user.typeOfDisability.join(', ') : user.typeOfDisability}</span></td>
                                    <td><span>{user.status}</span></td>
                                    <td><span>{user.date}</span></td>
                                    <td><span> <button onClick={() => {__handleChangeStatus(user)}}>Edit</button></span></td>
                                </tr>
                            ))}
                        </tbody>
                    : <h1>No data</h1>}
                </table>
            </div>
            </div>
            </div>
        </div>
  )
};

export default ApplicationList;
