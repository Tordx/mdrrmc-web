import React, { useEffect, useState } from 'react'
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { useSelector } from "react-redux";
import ReactTimeago from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChartColumn, faChartLine, faClock, faEarthAsia, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate } from 'react-router-dom';

const MapInformation = () => {

    const mapinformation =  useSelector(state => state.currentUser.user)
		const [city, setcity] = useState('')
		const [state, setstate] = useState('')
		const navigate = useNavigate()

		const firstDataItem = mapinformation.time
				const timeInSeconds = firstDataItem.seconds
				const date = new Date(timeInSeconds * 1000);
				const formattedTime = date;

				const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} 	${date.getFullYear()}`;

		useEffect(() => {
			const [ longitude, latitude] = mapinformation.coordinates
			console.log(longitude);
			const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(reverseGeocodingUrl)
          .then((response) => response.json())
          .then((data) => {
            
						console.log(data)
            const { address } = data;
            const city = address.city || address.town || address.village
            const state = address.county || address.state;
            setcity(city);
            setstate(state)

          })
          .catch((error) => {
            console.log('Reverse geocoding error:', error);
          });
		},[])

    return (
			<div className='chatContainer'>
				<div className='table-responsive'>
				<Sidebar menu={sidebar_menu} />
					<div className='mapinfo-container'>
						<button className="go-back-button-global" onClick={() => navigate('/admin/chat')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>&nbsp; Back</span>
        </button>
						<div className="mapinfo-wrapper">
							<div>
								<FontAwesomeIcon color = {'#B59410'} icon = {faClock} />
								<h2 className="date">{formattedDate}</h2>
								<ReactTimeago  className="info-time" date={formattedTime} />
							</div>
							<div className='info-margin'>
								<FontAwesomeIcon color='red' icon={faChartLine} />
								<h2>{mapinformation.area}</h2>
								<p>Magnitude</p>
							</div>
							<div>
								<FontAwesomeIcon color='blue' icon={faChartColumn} />
								<h2>{mapinformation.level}</h2>
								<p>Depth</p>
							</div>
							</div>
						<div className="maploc-wrapper">
							<h1>Disaster Location</h1>
							<div>
								<FontAwesomeIcon icon = {faLocationDot} />
								<h2>Epicenter is located at {city}, {state}</h2>
							</div>
							<div>
								<FontAwesomeIcon icon = {faEarthAsia} />
								<h2>latitude {mapinformation.coordinates[0].toFixed(2)} Longitude {mapinformation.coordinates[1].toFixed(2)}</h2>
							</div>
						</div>
					</div>
				</div>
			
			</div>
        );
}

export default MapInformation