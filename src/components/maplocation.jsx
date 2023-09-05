import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { db } from '../firebase';
import { doc, where , Timestamp , updateDoc , setDoc , collection , query , getDocs } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import allActions from '../redux/actions/indexAction';
import {useNavigate} from 'react-router-dom';


const Maplocation = ({ onMapClick, initialMarker }) => {

  const annoucement =  useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal
  const [clickedMarker, setClickedMarker] = useState(null);
  const navigate = useNavigate();
  const [err, setErr] = useState('')

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsb2thbG8iLCJhIjoiY2xkeXV5bWxwMHY3aTNvcjNsc3Bsc3hmdyJ9.n-Gnaro_yu9dj5PnUhNgfQ';

    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [120.2307078878246, 16.032108026014853], 
      zoom: 10, 
    });

    map.on('click', (e) => {
      setClickedMarker([e.lngLat.lng, e.lngLat.lat]);

      if (onMapClick) {
        onMapClick([e.lngLat.lng, e.lngLat.lat]);
      }
    });


if (initialMarker && Array.isArray(initialMarker)) {
  initialMarker.forEach((markerCoords) => {
    const [lng, lat] = markerCoords;

    const markerElement = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    markerElement.getElement().addEventListener('click', async() => {
      console.log('Marker clicked11111! Coordinates:', [lng, lat]);

      const q = query(
        collection(db, annoucement.user),
        where("coordinates", "==", [lng, lat]),
      );
      try {
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        dispatch(allActions.userAction.setMapInformation(data[0]))
        navigate("/admin/mapinformation");
      } catch (err) {
        setErr(true);
      }
    });
  });
}


    return () => map.remove();
  }, [initialMarker, onMapClick]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      padding: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '700px',
      maxWidth: '700px',
      maxHeight: '1000px',
      maxHeight: '1000px',
      borderColor: '#00000000'
    },
  };
  const mapContainerStyle = {
    width: '100%',
    height: '100vh', 
  };

  useEffect(() => {
    if (clickedMarker) {
      console.log('Clicked Marker Coordinates:', clickedMarker);
    }
  }, [clickedMarker]);

  return (

      <div id="map" style={mapContainerStyle} />

  );
  
};

export default Maplocation;