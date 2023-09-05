import React, { useState , useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const ElectricalAccident = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [area, setArea] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [cause, setCause] = useState('');
  const [location, setLocation] = useState('');
  const [damage, setDamage] = useState('');
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
    setCoordinates(coordinates);
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
    const id =  uuid()
    const timestamp = Timestamp.now().toDate();
    const monthCount = timestamp.getMonth();
  
    const docRef = doc(db, 'chartDataset', 'electrical-accident');
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

    try {

      const formData = {
        area: area,
        coordinates: coordinates,
        cause: cause,
        location: location,
        damage: damage,
        time: time,
        title: title,
        id: id,
      }

      const earthquakeRef = doc(db, 'electrical-accident', id); 
      await setDoc(earthquakeRef, formData);
      setArea('');
      setCoordinates('');
      setCause('');
      setLocation('');
      setDamage('');
      setTitle('');
      setModalIsOpen(false)
      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };

  return (
    <div className="alert-modal-container">
    <div style={{ width: '100%' }}>
      <h2>Recent Electrical Incident</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>

      <label htmlFor="area">Area</label>
      <input
        placeholder='What are the damages?'
        type="text"
        id="area"
        name="area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />

      <label htmlFor="area">Damage</label>
      <input
        placeholder='What are the damages?'
        type="text"
        id="Damage"
        name="Damage"
        value={damage}
        onChange={(e) => setDamage(e.target.value)}
      />

      <label htmlFor="depth">Location</label>
      <input
        placeholder='where it happened?'
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label htmlFor="location">cause</label>
      <input
        placeholder='What is the cause?'
        type="text"
        id="cause"
        name="cause"
        value={cause}
        onChange={(e) => setCause(e.target.value)}
      />

      <label htmlFor="title">Title</label>
      <input
        placeholder='What should people know?'
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

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

export default ElectricalAccident;
