import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const OpenMap = ({ mapType, coordinates }) => {
  const lineOptions = {
    color: '#8996AF',
  };

  return (
    <div className="open-map">
      <MapContainer center={[1.288258354433791, 103.78197312355043]} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapType === 'direction' ? (
          <Polyline
            positions={coordinates.map((location) => [location.coords.lat, location.coords.lng])}
            pathOptions={lineOptions}
          />
        ) : (
          coordinates.map((location) => (
            <Marker key={location.id} position={[location.coords.lat, location.coords.lng]}>
              {location.info && (
                <Popup>
                  <div>
                    <h2>{location.info.name}</h2>
                    <p>{location.info.content}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default OpenMap;
