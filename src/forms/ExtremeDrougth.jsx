import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const ExtremeDrougth = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [area, setArea] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [time, setTime] = useState('');
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
  
    const docRef = doc(db, 'chartDataset', 'extreme-drougth');
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
      level: level,
      id: id,
      location: location,
      temperature: temperature,
      time: timestamp,
      title: title,
    };

    try {
      const earthquakeRef = doc(db, 'extreme-drougth' , id); 
      await setDoc(earthquakeRef, formData);

      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };

  return (
    <div className="alert-modal-container">
    <div style= {{width: '100%'}} >
      <h2>Extreme Drougth Details Form</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
          <label htmlFor="area">Area</label>
          <input
            placeholder='Diameter of the affected area from the center'
            type="text" 
            id="area" 
            name="area" 
            value={area} 
            onChange={(e) => setArea(e.target.value)} />
          <label htmlFor="level">Level:</label>
          <input
            placeholder='Heat level of the extreme drought'
            type="text" 
            id="level" 
            name="level" 
            value={level} 
            onChange={(e) => setLevel(e.target.value)} 
          />
          <label htmlFor="location">Location</label>
          <input
            placeholder='Name of the place the calamity, accident, or disaster occured'
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="temperature">Temperature</label>
          <input
            placeholder='Minimum or Maximum Temparature within the duration'
            type="text"
            id="temperature"
            name="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <label htmlFor="title">Title:</label>
          <input
            placeholder='Brief description or name of the calamity'
            type="text" 
            id="title" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} />
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

export default ExtremeDrougth;
