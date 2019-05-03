import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  state = {
    currentLocation: ""
  };

  componentDidMount = () => {
    console.log("it mounted");
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition = (position) => {
    let currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    this.setState({ currentLocation: currentLocation });
    // console.log(this.state.imageLocation)
    // return currentLocation;
  }

  render() {
    const googleMapKey = process.env.REACT_APP_GOOGLEMAP_API_KEY;
    const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapKey + '&v=3.exp&libraries=geometry,drawing'
    const SnapHuntMap = withScriptjs(withGoogleMap(props => (
    <GoogleMap
      defaultCenter = { this.state.currentLocation }
      defaultZoom = { 17.5 }
    >
      <Marker position={this.state.currentLocation} />
      <Marker position={{lat: 28.744246, lng: -81.3076798}} text="The School" />
    </GoogleMap>
    )));

    return (
      <SnapHuntMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%' }}>Loading...</div>}
        containerElement={ <div id="snap-map" style={{ height: 'calc(100vh - 60px)', width: '100%', marginTop: '56px' }} /> }
        mapElement={ <div style={{ height: '100%' }} /> }
      />
    );
  }
};

export default Map;
