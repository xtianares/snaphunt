import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import iconMarker from "./iconMarker.svg"

class HuntMarker extends Component {
  state = {
    isOpen: false,
    activeMarker: this.props.activeMarker
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen}, () =>{
        if (!this.state.isOpen){
          this.setState({activeMarker: false}, () => {
            this.closeMarkers(null)
          })
        } else {
          this.closeMarkers(this.props.uid)
        }
      }
    )
  }

  componentWillReceiveProps(nextProps){
    this.setState({activeMarker: nextProps.activeMarker})
  }

  closeMarkers = (uid) => {
		this.setState({activeMarker: uid})
	}


  render(){
    return(
      <Marker onClick={this.toggleOpen}
        position={this.props.position}
        // icon={iconMarker}
      >
      { this.state.isOpen ?
        <InfoWindow maxWidth={800} defaultPosition={ this.props.position } onCloseClick={this.onToggleOpen}>
          <div>
            <h6>{this.props.huntName}</h6>
            <a href={`/hunt/${this.props.huntId}`}>View</a>
          </div>
        </InfoWindow> : null
      }
      </Marker>
    )
  }
}

export default HuntMarker;
