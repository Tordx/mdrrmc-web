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
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    cause: '',
    id: uuid(),
    location: '',
    damage: '',
    time: Timestamp.now(),
    title: '',
  });

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
    console.log('coordinates');
    console.log(coordinates);
    console.log('coordinates');
    // setModalIsOpen(false)
    setFormData({
        ...formData,
        coordinates: coordinates
      });
  };

  const handleButtonClick = () => {
    setModalIsOpen(true)
    console.log(formData.coordinates);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const earthquakeRef = doc(db, 'electrical-accident', uuid()); 
      await setDoc(earthquakeRef, formData);

      setFormData({
        area: '',
        coordinates: '',
        cause: '',
        location: '',
        damage: '',
        time: '',
        title: '',
      });

      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };

  return (
    <div className="alert-modal-container">
      <div style= {{width: '100%'}} >
      <h2>Recent Electrical Incident</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
          <label htmlFor="area">Damage</label>
          <input 
            placeholder='What are the damages?'
            type="text" 
            id="area" 
            name="area" 
            value={formData.damage} 
            onChange={handleChange} 
          />
          <label htmlFor="depth">Location</label>
          <input
            placeholder='where it happened?'
            type="text" 
            id="depth" 
            name="depth" 
            value={formData.location} 
            onChange={handleChange} 
          />
          <label htmlFor="location">Cause</label>
          <input
            placeholder='What is the cause?'
            type="text"
            id="location"
            name="location"
            value={formData.cause}
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
          <input
            placeholder='What should people know?'
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
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
