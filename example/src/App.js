import './styles/App.scss';
import { GoogleMap } from 'react-lib-components';
import { ShipServiceLoop } from 'react-lib-components';
import { RouteStage } from 'react-lib-components';
import { OpenMap } from 'react-lib-components';

function App() {
  const coordinates = [
    { id: 'place1', coords: { lat: 37.772, lng: -122.214 } },
    { id: 'place2', coords: { lat: 21.291, lng: -157.821 } },
    { id: 'place3', coords: { lat: -18.142, lng: 178.431 } },
    {
      id: 'place4',
      coords: { lat: -27.467, lng: 153.027 },
      info: { name: 'Place 4', content: 'This is your info window content' },
    },
    {
      id: 'place5',
      coords: { lat: 1.288258354433791, lng: 103.78197312355043 },
      info: { name: 'The Crimson', content: 'CrimsonLogic Pte Ltd, 31 Science Park Rd, Singapore 117611' },
    },
  ];
  const ports = [
    { id: 'port1', name: 'Singapore' },
    { id: 'port2', name: 'Port Klang' },
    { id: 'port3', name: 'Fremantle' },
    { id: 'port4', name: 'Sydney' },
    { id: 'port5', name: 'Melbourn' },
    { id: 'port6', name: 'Adelaide' },
    { id: 'port7', name: 'Perth' },
    { id: 'port8', name: 'Fremantle' },
    { id: 'port9', name: 'Port Klang' },
    { id: 'port10', name: 'Singapore' },
  ];

  return (
    <div className="wrapper">
      {/* <div className="map">
        <GoogleMap mapType="marker" coordinates={coordinates} />
      </div> */}
      {/* <div className="flow">
        <Ports stages={ports} />
      </div> */}
      {/* <div className="flow">
        <RouteStage stages={ports} />
      </div> */}
      <OpenMap mapType="direction" coordinates={coordinates} />
    </div>
  );
}

export default App;
