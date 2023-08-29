import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';


const EarthquakeForm = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    depth: '',
    id: uuid(),
    location: '',
    magnitude: '',
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

    try {
      // Add the form data to Firestore
      const earthquakeRef = doc(db, 'earthquake' , uuid()); // Replace 'earthquakes' with your collection name
      await setDoc(earthquakeRef, formData);

      // Optionally, you can reset the form after successful submission
      setFormData({
        area: '',
        coordinates: '',
        depth: '',
        location: '',
        magnitude: '',
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
      <h2>Recent Earthquake monitoring</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
          <label htmlFor="area">Area</label>
          <input 
            type="text" 
            id="area" 
            name="area" 
            value={formData.area} 
            onChange={handleChange} 
          />
          <label htmlFor="depth">Depth</label>
          <input 
            type="text" 
            id="depth" 
            name="depth" 
            value={formData.depth} 
            onChange={handleChange} 
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <label htmlFor="magnitude">Magnitude</label>
          <input
            type="text"
            id="magnitude"
            name="magnitude"
            value={formData.magnitude}
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
          <input 
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

export default EarthquakeForm;
