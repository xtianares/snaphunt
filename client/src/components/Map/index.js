import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import API from "../../utils/API";

class Map extends Component {
  state = {
    currentLocation: "",
    hunts: []
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
      lng: position.coords.longitude,
      lat: position.coords.latitude
    }
    this.setState({ currentLocation: currentLocation });
    // console.log(this.state.imageLocation)
    // return currentLocation;
    this.getHunts();
  }

  getHunts = () => {
    // console.log(this.state.currentLocation.lng, this.state.currentLocation.lat)
    API.getHuntsNearMe({
      lng: this.state.currentLocation.lng,
      lat: this.state.currentLocation.lat
      // lng: -81.3076798,
      // lat: 28.744246
    })
      .then(huntData => {
        // console.log(userData.data);
        if(huntData.data != null && huntData.data.errmsg == null){
          console.log(huntData.data);
          this.setState({ hunts: huntData.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const googleMapKey = process.env.REACT_APP_GOOGLEMAP_API_KEY;
    const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapKey + '&v=3.exp&libraries=geometry,drawing';
    const huntMarkers = this.state.hunts.map((item, key) =>
      <Marker key={item._id} position={item.location} />
    );
    const SnapHuntMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { this.state.currentLocation }
        defaultZoom = { 17 }
      >
        <Marker position={this.state.currentLocation} />
        {/*<Marker position={{lng: -81.3076798, lat: 28.744246}} text="The School" />*/}
        {huntMarkers}
      </GoogleMap>
    )));
    console.log(huntMarkers);

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
