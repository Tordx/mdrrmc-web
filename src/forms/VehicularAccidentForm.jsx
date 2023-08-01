import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc , Timestamp , updateDoc , setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const VehicularAccident = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    typeofvehicleinvolve: '',
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
      maxHeight: '700px',
      maxHeight: '700px',
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

    try {
      // Add the form data to Firestore
      const earthquakeRef = doc(db, 'vehicular-accident', uuid()); // Replace 'earthquakes' with your collection name
      await setDoc(earthquakeRef, formData);

      // Optionally, you can reset the form after successful submission
      setFormData({
        area: '',
        coordinates: '',
        typeofvehicleinvolve: '',
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
    <div className="form-container1">
      <h2>Vehicular Accident Details Form</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
      <form className="form1" onSubmit={handleSubmit}>
        <div className="form-field1">
          <label htmlFor="area">Area:</label>
          <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="coordinates">Coordinates:</label>
          <input
            type="text"
            id="coordinates"
            name="coordinates"
            value={formData.coordinates}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="damage">Damage:</label>
          <input type="text" id="damage" name="damage" value={formData.damage} onChange={handleChange} />
        </div>
        {/* <div className="form-field">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
        </div> */}
        <div className="form-field">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="typeofvehicleinvolve">Type of Vehicle Involve:</label>
          <input
            type="text"
            id="typeofvehicleinvolve"
            name="typeofvehicleinvolve"
            value={formData.typeofvehicleinvolve}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-field">
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
        </div> */}
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        >
         <Maplocation
         onMapClick={handleMapClick}
         />
        </ReactModal>
    </div>
  );
};

export default VehicularAccident;
