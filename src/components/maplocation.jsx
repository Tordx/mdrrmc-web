import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maplocation = ({ onMapClick, initialMarker }) => {
  const [clickedMarker, setClickedMarker] = useState(null);

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

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      });
    }

    return () => map.remove();
  }, [initialMarker, onMapClick]);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh', 
  };

  useEffect(() => {
    if (clickedMarker) {
      console.log('Clicked Marker Coordinates:', clickedMarker);
    }
  }, [clickedMarker]);

  return <div id="map" style={mapContainerStyle} />;
};

export default Maplocation;