import React, { useState } from 'react';


const WeatherMonitoringForm = () => {
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    signal: '',
    id: '',
    location: '',
    windspeed: '',
    time: '',
    title: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, like submitting it to an API or performing some action.
    console.log(formData);
  };

  return (
    <div className="form-container1">
      <h2>Weather Monitoring Details Form</h2>
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
          <label htmlFor="signal">Signal:</label>
          <input type="text" id="signal" name="signal" value={formData.signal} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
        </div>
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
          <label htmlFor="windspeed">Windspeed:</label>
          <input
            type="text"
            id="windspeed"
            name="windspeed"
            value={formData.windspeed}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WeatherMonitoringForm;
