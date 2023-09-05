import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';


const EarthquakeForm = (props) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [area, setArea] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [depth, setDepth] = useState('');
  const [location, setLocation] = useState('');
  const [magnitude, setMagnitude] = useState('');
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
    console.log('coordinates');
    console.log(coordinates);
    console.log('coordinates');
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
    props.onFormSubmit(true);
     const id =  uuid()
    const timestamp = Timestamp.now().toDate();
    const monthCount = timestamp.getMonth();
  
    const docRef = doc(db, 'chartDataset', 'earthquake');
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
      depth: depth,
      location: location,
      title: title,
      id: id,
      magnitude: magnitude,
      time: timestamp,
    }

    try {
      if(coordinates != null){
      const earthquakeRef = doc(db, 'earthquake' , id); 
      await setDoc(earthquakeRef, formData);
      setArea('');
      setCoordinates('');
      setDepth('');
      setLocation('');
      setMagnitude('');
      setTitle('');
      setModalIsOpen(false)
      props.onFormSubmit(false);
      console.log('Form data added to Firestore!');} else {
        alert('Please set the map coordinates')
        props.onFormSubmit(false);
      }
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
      props.onFormSubmit(false);
    }
  };

  return (
    <div className="alert-modal-container">
      <div style={{ width: '100%' }}>
        <h2>Recent Earthquake monitoring</h2>
        <button onClick={handleButtonClick}>Get Coordinates</button>
        <label htmlFor="area">Area</label>
        <input
          placeholder='Diameter of the affected area from the center'
          type="text"
          id="area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <label htmlFor="depth">Depth</label>
        <input
          placeholder='How many meters below or above sea level?'
          type="text"
          id="depth"
          name="depth"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />
        <label htmlFor="location">Location</label>
        <input
          placeholder='Name of the place the calamity, accident, or disaster occurred'
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="magnitude">Magnitude</label>
        <input
          placeholder='What is the Magnitude of the disaster'
          type="text"
          id="magnitude"
          name="magnitude"
          value={magnitude}
          onChange={(e) => setMagnitude(e.target.value)}
        />
        <label htmlFor="title">Title</label>
        <input
          placeholder='Short Description or Name of what happened'
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

export default EarthquakeForm;
