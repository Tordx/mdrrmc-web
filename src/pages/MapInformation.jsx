import React from 'react'
import Sidebar from '../components/navbar/sidebar';
import sidebar_menu from '../components/navbar/sidebarmenu';
import { useSelector } from "react-redux";

const MapInformation = () => {

    const mapinformation =  useSelector(state => state.currentUser.user)
    return (
        <div className='chatContainer'>
         < div className='table-responsive'>
             <Sidebar menu={sidebar_menu} />
             <div className="table-wrapper">
                <h2>Title:{mapinformation.title}</h2>
                <h2>Area:{mapinformation.area}</h2>
                <h2>Level:{mapinformation.level}</h2>
                <h2>Location:{mapinformation.location}</h2>
                <h2>Temperature:{mapinformation.temperature}</h2>
             </div>
             </div>
          </div>
        );
}

export default MapInformation