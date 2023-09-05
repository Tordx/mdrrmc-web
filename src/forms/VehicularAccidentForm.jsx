import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const VehicularAccident = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [area, setArea] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [typeofvehicleinvolve, setTypeOfVehicleInvolved] = useState('');
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
  
    const docRef = doc(db, 'chartDataset', 'vehicular-accident');
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
      typeofvehicleinvolve: typeofvehicleinvolve,
      id: id,
      location: location,
      damage: damage,
      time: time,
      title: title,
    };

    try {
      
      const earthquakeRef = doc(db, 'vehicular-accident', id); 
      await setDoc(earthquakeRef, formData);

      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };

  return (
    <div className="alert-modal-container">
     <div style = {{width: '100%'}}>
      <h2>Vehicular Accident Details Form</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
          <label htmlFor="area">Area:</label>
          <input type="text" id="area" name="area" value={area} onChange={(e) => setArea(e.target.value)} />
          <label htmlFor="damage">Damage:</label>
          <input type="text" id="damage" name="damage" value={damage} onChange={(e) => setDamage(e.target.value)} />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="typeofvehicleinvolve">Type of Vehicle Involve:</label>
          <input
            type="text"
            id="typeofvehicleinvolve"
            name="typeofvehicleinvolve"
            value={typeofvehicleinvolve}
            onChange={(e) => setTypeOfVehicleInvolved(e.target.value)}
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

export default VehicularAccident;
