import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const Flood = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [area, setArea] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [waterlevel, setWaterlevel] = useState('');
  const [id] = useState(uuid());
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState(Timestamp.now());
  const [title, setTitle] = useState('');

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '90%',
      maxWidth: '100%',
      minHeight: '90%',
      maxHeight: '90%',
    },
  };
  const handleMapClick = (coordinates) => {
    setCoordinates(coordinates)
  };

  const handleButtonClick = () => {
    setModalIsOpen(true)
    console.log(coordinates);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuid()
    const timestamp = Timestamp.now().toDate();
    const monthCount = timestamp.getMonth();
  
    const docRef = doc(db, 'chartDataset', 'flood');
    const docSnapshot = await getDoc(docRef);
  
    if (docSnapshot.exists()) {
      const data = docSnapshot.data().datasets[0].data;
      const updated = data[monthCount] + 1;
      data[monthCount] = updated;
  
      const currentData = docSnapshot.data();
      currentData.datasets[0].data = data;
      await setDoc(docRef, currentData, { merge: true });
  
      console.log('Updated Data:', data);
    } else {
      console.log('Document does not exist.');
    }

    const formData = {
    area: area,
    coordinates: coordinates,
    waterlevel: waterlevel,
    id: id,
    location: location,
    duration: duration,
    time: timestamp,
    title: title,
  };
  
    try {
      
      const earthquakeRef = doc(db, 'flood', id);
      await setDoc(earthquakeRef, formData);
  
      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };
  

  return (
    <div className="alert-modal-container">
    <div style = {{width: '100%'}}>
      <h2>Flood Details Form</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
          <label htmlFor="area">Area</label>
          <input 
            placeholder='Diameter of the affected area of flood'
            type="text" 
            id="area" 
            name="area" 
            value={area} 
            onChange={(e) => setArea(e.target.value)} />
          <label htmlFor="duration">Duration:</label>
          <input 
            placeholder='Estimated duration of the Flood Rain'
            type="text" 
            id="duration" 
            name="duration" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} />
          <label htmlFor="location">Location:</label>
          <input
            placeholder='Name of the place the calamity, accident, or disaster occured'
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="waterlevel">Water Level</label>
          <input
            type="text"
            id="waterlevel"
            name="waterlevel"
            value={waterlevel}
            onChange={(e) => setWaterlevel(e.target.value)}
          />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleSubmit} type="submit">Submit</button>
        </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        >
         <Maplocation
         onMapClick={handleMapClick}
         />
          <button onClick={() => setModalIsOpen(false)} className="gobackbuttonalert">Back</button>
        </ReactModal>
    </div>
  );
};

export default Flood;
