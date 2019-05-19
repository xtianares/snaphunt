import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Webcam from "react-webcam";
import queryString from 'query-string';
import API from "../utils/API";

class Capture extends Component {
  state = {
    imageData: "",
    location: "",
    userId: "", // need to grab this from cached
    huntId: "",  // need to grab this
    keyword: "", // this is grabed form the url query string
    keywordMatched : false,
    tryAgain: false
  };

  componentDidMount = () => {
    // console.log("it mounted");
    this.getLocation();
    const queryStrings = queryString.parse(this.props.location.search)
    // console.log(queryStrings.keyword);
    this.setState({
      userId: localStorage.getItem('authId'), // need to grab this from cached
      huntId: queryStrings.huntId || this.props.match.params.huntId,
      keyword: queryStrings.keyword || this.props.match.params.keyword
    });
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
    this.setState({ location: currentLocation });
    // console.log(this.state.location)
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
    this.setState({
      imageData: "",
      keywordMatched: false,
      tryAgain: false
    });
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
        location: this.state.location,
        userId: this.state.userId,
        keyword: this.state.keyword,
        huntId: this.state.huntId
    })
    .then(snapData => {
      console.log(snapData.data);
      console.log('error: ' + snapData.data.err);
      if (snapData.data !== null && snapData.data.err === undefined) {
        console.log(snapData)
        this.setState({
          keywordMatched: true
        });

        API.getUser(this.state.userId)
          .then(userData => {
            let {inProgressHunts} = userData.data;
            if(userData.data != null && userData.data.errmsg == null && inProgressHunts) {
              if (inProgressHunts.length > 0) {
                // need to get the index and modify it
                let theIndex = inProgressHunts.findIndex(item => item._id == this.state.huntId);
                console.log(theIndex);
                let values = Object.values(inProgressHunts[theIndex].keywords)
                if (values.indexOf(false) < 0) {
                  console.log("Hunt completed");
                  inProgressHunts.splice(theIndex, 1);
                  // add current hunt to completedHunts and remove from inProgressHunts
                  API.updateUser(this.state.userId, { $push: { completedHunts: this.state.huntId }, inProgressHunts: inProgressHunts})
                    .then(userData => {
                      console.log(userData);
                    })
                }
                else {
                  console.log("Hunt not complete");
                }
              }
            }
        })
        .catch(err => console.log(err));

      }
      else if (snapData.data.err) {
        console.log(snapData.data.err)
        this.setState({
          keywordMatched: false,
          tryAgain: true
        });
        // this.retake();
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
              {
                this.state.keywordMatched ?
                <div className="snap-status text-center d-flex justify-content-center align-items-center">
                  <div>
                    <h3>Good Job!</h3>
                    <p>Snap matched the keyword!</p>
                    <a className="btn btn-success" href={`/hunt/${this.state.huntId}`}>Continue Hunt</a>
                  </div>
                </div>
                : null
              }
              {
                this.state.tryAgain ?
                <div className="snap-status text-center d-flex justify-content-center align-items-center">
                  <div>
                    <h3>Nope, try again!</h3>
                    <p>Snap didn't matched the keyword!</p>
                    <button className="btn btn-success" onClick={this.retake}>Try Again</button>
                  </div>
                </div>
                : null
              }
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
