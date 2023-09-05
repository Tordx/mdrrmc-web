import React from 'react'
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { useSelector } from "react-redux";
import ReactTimeago from 'react-timeago';

const MapInformation = () => {

    const mapinformation =  useSelector(state => state.currentUser.user)

		const firstDataItem = mapinformation.time
				const timeInSeconds = firstDataItem.seconds
				const date = new Date(timeInSeconds * 1000);
				const formattedTime = date;

				const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    return (
			<div className='chatContainer'>
				<div className='table-responsive'>
				<Sidebar menu={sidebar_menu} />
					<div className='mapinfo-container'>
						<div className="mapinfo-wrapper">
							<h2>Area:{mapinformation.area}</h2>
							<h2>Level:{mapinformation.level}</h2>
							<h2>Location:{mapinformation.location}</h2>
							<h2>Temperature:{mapinformation.coordinates[0].toFixed(2)}{mapinformation.coordinates[0].toFixed(2)}</h2>
							<ReactTimeago className="time" date={formattedTime} />
							<p className="time">{formattedDate}</p>
							</div>
						<div className="mapinfo-wrapper">
						<h2>Area:{mapinformation.area}</h2>
						<h2>Level:{mapinformation.level}</h2>
						<h2>Location:{mapinformation.location}</h2>
						<h2>Temperature:{mapinformation.coordinates[0].toFixed(2)}{mapinformation.coordinates[0].toFixed(2)}</h2>
						<ReactTimeago className="time" date={formattedTime} />
						</div>
					</div>
				</div>
			</div>
        );
}

export default MapInformation