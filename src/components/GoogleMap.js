import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useJsApiLoader, GoogleMap as GMap, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

const API_KEY = process.env.REACT_APP_MAP_API_KEY;

function GoogleMap({ mapType, coordinates }) {
  const [mapRef, setMapRef] = useState(null);
  const [center, setCenter] = useState({ lat: 1.288258354433791, lng: 103.78197312355043 });
  const [zoom, setZoom] = useState(3);

  const [markerMap, setMarkerMap] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    coordinates.map((place) => {
      bounds.extend(place.coords);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    setMapRef(map);
    fitBounds(map);
    if (mapType === 'marker') setZoom(17);
  };

  const handleMarkerLoad = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const handleMarkerClick = (event, place) => {
    setSelectedMarker(place);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const renderMap = () => {
    const containerStyle = {
      height: '100%',
      width: '100%',
    };
    const mapOptions = {
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP,
      },
    };
    // const zoom = mapType === 'marker' ? 17 : 3;

    const arrowSymbol = {
      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };
    const circlSymbol = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 5,
      fillColor: '#fff',
      fillOpacity: 1.0,
      strokeColor: '#7CE7AC',
      strokeWeight: 3,
    };
    const lineOptions = {
      strokeColor: '#8996AF',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      icons: [
        {
          icon: circlSymbol,
          offset: '0%',
        },
        {
          icon: arrowSymbol,
          offset: '25%',
        },
        {
          icon: arrowSymbol,
          offset: '50%',
        },
        {
          icon: arrowSymbol,
          offset: '75%',
        },
        {
          icon: circlSymbol,
          offset: '100%',
        },
      ],
    };

    return (
      <div className="google-map">
        <GMap mapContainerStyle={containerStyle} options={mapOptions} center={center} zoom={zoom} onLoad={loadHandler}>
          {mapType === 'direction' ? (
            <Polyline path={coordinates.map((place) => place.coords)} options={lineOptions} />
          ) : (
            coordinates.map((place) => (
              <Marker
                key={place.id}
                position={place.coords}
                onLoad={(marker) => handleMarkerLoad(marker, place)}
                onClick={(event) => handleMarkerClick(event, place)}
                title={place.info ? place.info.name : ''}
              />
            ))
          )}
          {infoOpen && selectedMarker && selectedMarker.info && (
            <InfoWindow anchor={markerMap[selectedMarker.id]} onCloseClick={() => setInfoOpen(false)}>
              <div className="info-window">
                <h3 className="name">{selectedMarker.info.name}</h3>
                <div className="content">{selectedMarker.info.content}</div>
              </div>
            </InfoWindow>
          )}
        </GMap>
      </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : null;
}

GoogleMap.propTypes = {
  mapType: propTypes.string.isRequired,
};

GoogleMap.defaultProps = {};

export default GoogleMap;
