import React, { useState , useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maplocation = ({onMapClick}) => {
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsb2thbG8iLCJhIjoiY2xkeXV5bWxwMHY3aTNvcjNsc3Bsc3hmdyJ9.n-Gnaro_yu9dj5PnUhNgfQ';
    
        const map = new mapboxgl.Map({
          container: 'map', // ID of the div element to render the map
          style: 'mapbox://styles/kalokalo/cldzyog2k000a01t401qifylc', // Mapbox base style
          center: [120.2307078878246, 16.032108026014853], // Initial map center coordinates (e.g., [-122.4194, 37.7749])
          zoom: 12, // Initial zoom levell
        });

        let marker = new mapboxgl.Marker();

        map.on('click', (e) => {
            // Get the clicked coordinates from the event
            const { lng, lat } = e.lngLat;

            marker.setLngLat([lng, lat]).addTo(map);
      
            // Do something with the coordinates (e.g., log them)
            onMapClick([lng, lat]);
            console.log('Clicked coordinates:', [lng, lat]);
          });
    
        // Clean up the map on component unmount
        return () => map.remove();
      }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} />
  );
};

export default Maplocation;
