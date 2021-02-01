import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useJsApiLoader, GoogleMap as GoogleMap$1, Polyline, Marker, InfoWindow } from '@react-google-maps/api';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var API_KEY = process.env.REACT_APP_MAP_API_KEY;

function GoogleMap(_ref) {
  var mapType = _ref.mapType,
      coordinates = _ref.coordinates;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var setMapRef = _useState2[1];

  var _useState3 = useState({
    lat: 1.288258354433791,
    lng: 103.78197312355043
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      center = _useState4[0];
      _useState4[1];

  var _useState5 = useState(3),
      _useState6 = _slicedToArray(_useState5, 2),
      zoom = _useState6[0],
      setZoom = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      markerMap = _useState8[0],
      setMarkerMap = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      selectedMarker = _useState10[0],
      setSelectedMarker = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      infoOpen = _useState12[0],
      setInfoOpen = _useState12[1];

  var _useJsApiLoader = useJsApiLoader({
    googleMapsApiKey: API_KEY
  }),
      isLoaded = _useJsApiLoader.isLoaded,
      loadError = _useJsApiLoader.loadError;

  var fitBounds = function fitBounds(map) {
    var bounds = new window.google.maps.LatLngBounds();
    coordinates.map(function (place) {
      bounds.extend(place.coords);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  var loadHandler = function loadHandler(map) {
    setMapRef(map);
    fitBounds(map);
    if (mapType === 'marker') setZoom(17);
  };

  var handleMarkerLoad = function handleMarkerLoad(marker, place) {
    return setMarkerMap(function (prevState) {
      return _objectSpread2(_objectSpread2({}, prevState), {}, _defineProperty({}, place.id, marker));
    });
  };

  var handleMarkerClick = function handleMarkerClick(event, place) {
    setSelectedMarker(place);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  var renderMap = function renderMap() {
    var containerStyle = {
      height: '100%',
      width: '100%'
    };
    var mapOptions = {
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP
      }
    }; // const zoom = mapType === 'marker' ? 17 : 3;

    var arrowSymbol = {
      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var circlSymbol = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 5,
      fillColor: '#fff',
      fillOpacity: 1.0,
      strokeColor: '#7CE7AC',
      strokeWeight: 3
    };
    var lineOptions = {
      strokeColor: '#8996AF',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      icons: [{
        icon: circlSymbol,
        offset: '0%'
      }, {
        icon: arrowSymbol,
        offset: '25%'
      }, {
        icon: arrowSymbol,
        offset: '50%'
      }, {
        icon: arrowSymbol,
        offset: '75%'
      }, {
        icon: circlSymbol,
        offset: '100%'
      }]
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "google-map"
    }, /*#__PURE__*/React.createElement(GoogleMap$1, {
      mapContainerStyle: containerStyle,
      options: mapOptions,
      center: center,
      zoom: zoom,
      onLoad: loadHandler
    }, mapType === 'direction' ? /*#__PURE__*/React.createElement(Polyline, {
      path: coordinates.map(function (place) {
        return place.coords;
      }),
      options: lineOptions
    }) : coordinates.map(function (place) {
      return /*#__PURE__*/React.createElement(Marker, {
        key: place.id,
        position: place.coords,
        onLoad: function onLoad(marker) {
          return handleMarkerLoad(marker, place);
        },
        onClick: function onClick(event) {
          return handleMarkerClick(event, place);
        },
        title: place.info ? place.info.name : ''
      });
    }), infoOpen && selectedMarker && selectedMarker.info && /*#__PURE__*/React.createElement(InfoWindow, {
      anchor: markerMap[selectedMarker.id],
      onCloseClick: function onCloseClick() {
        return setInfoOpen(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "info-window"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "name"
    }, selectedMarker.info.name), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, selectedMarker.info.content)))));
  };

  if (loadError) {
    return /*#__PURE__*/React.createElement("div", null, "Map cannot be loaded right now, sorry.");
  }

  return isLoaded ? renderMap() : null;
}

GoogleMap.propTypes = {
  mapType: propTypes.string.isRequired
};
GoogleMap.defaultProps = {};

var ShipServiceLoop = function ShipServiceLoop(_ref) {
  var stages = _ref.stages;
  return /*#__PURE__*/React.createElement("div", {
    className: "workflow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ship-icon"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faShip
  })), /*#__PURE__*/React.createElement("ul", null, stages.map(function (port) {
    return /*#__PURE__*/React.createElement("li", {
      key: port.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "icon"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "14",
      viewBox: "0 0 492.004 492.004"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
    })), /*#__PURE__*/React.createElement("div", {
      className: "circle"
    })), /*#__PURE__*/React.createElement("div", {
      className: "name"
    }, port.name));
  })));
};

var RouteStage = function RouteStage(_ref) {
  var stages = _ref.stages;
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ship-icon"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faShip
  })), /*#__PURE__*/React.createElement("div", {
    className: "stage-contailer"
  }, stages.map(function (port) {
    return /*#__PURE__*/React.createElement("div", {
      className: "item-wrapper",
      key: port.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "line"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "14",
      viewBox: "0 0 492.004 492.004"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "name"
    }, port.name)));
  })));
};

export { GoogleMap, RouteStage, ShipServiceLoop };
