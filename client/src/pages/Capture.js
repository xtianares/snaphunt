import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Webcam from "react-webcam";
import API from "../utils/API";

class Capture extends Component {
  state = {
    imageData: "",
    imageLocation: "",
    userId: "", // need to grab this from cached
    huntId: ""  // need to grab this
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
    this.setState({ imageLocation: currentLocation });
    // console.log(this.state.imageLocation)
    // return currentLocation;
  }

  setRef = webcam => {
    this.webcam = webcam;
    document.querySelector(".camera-trigger").classList.remove("hide");
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    // console.log(imageSrc);
    this.getLocation();
    this.setState({ imageData: imageSrc });
    document.querySelector(".camera-output").src = imageSrc;
    document.querySelector(".camera-output").classList.add("taken");
    document.querySelector(".camera-retake").classList.add("show");
    document.querySelector(".camera-upload").classList.add("show");
    document.querySelector(".camera-trigger").classList.add("hide");
  };

  retake = () => {
    this.setState({ imageData: "" });
    document.querySelector(".camera-output").src = "//:0";
    document.querySelector(".camera-output").classList.remove("taken");
    document.querySelector(".camera-retake").classList.remove("show");
    document.querySelector(".camera-upload").classList.remove("show");
    document.querySelector(".camera-trigger").classList.remove("hide");
  };

  // call api to post the image
  submit = () => {
    console.log(this.state.imageData);
    API.saveSnap({
        imageData: this.state.imageData,
        location: this.state.imageLocation,
        authId: localStorage.getItem('authId')
    })
      .then(snapData => {
        // console.log(userData.data);
        if(snapData != null){
          console.log(snapData)
        }
        else {
          let err = "Something went wrong!";
          console.log(err);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const videoConstraints = {
      width: 800,
      height: 800,
      facingMode: "environment" // or "user"
    };
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <div className="camera">
              <Webcam
                audio={false}
                ref={this.setRef}
                width={800}
                height={800}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                screenshotQuality={1}
              />
              <img src="//:0" alt="" className="camera-output" />
              <button className="camera-trigger hide" onClick={this.capture}><i data-feather="camera"></i></button>
              <button className="camera-retake" onClick={this.retake}><i data-feather="x"></i></button>
              <button className="camera-upload" onClick={this.submit}><i data-feather="upload"></i></button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Capture;
