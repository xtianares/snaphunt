import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";

class Create extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    userId: localStorage.getItem("authId") || "", // need to grab this from cache
    currentLocation: "",
    huntName: "",
    keywords: []
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setLocation = (position) => {
    let currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    this.setState({ currentLocation: currentLocation });
    // console.log(this.state.imageLocation)
    // return currentLocation;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name.indexOf("keyword") >= 0) {
      let theKeys = this.state.keywords;
      if (value !== '') {
        theKeys.push(value);
      }
      this.setState({
        keywords: theKeys
      });
    }
    else {
      this.setState({
        [name]: (value).toLowerCase()
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.huntName && this.state.currentLocation && this.state.userId && (this.state.keywords).length >= 3) {
      API.saveHunt({
          huntName: this.state.huntName,
          location: this.state.currentLocation,
          userId: this.state.userId,
          keywords: this.state.keywords
      })
        .then(huntData => {
          // console.log(userData.data);
          if(huntData.data != null && huntData.data.errmsg == null){
            console.log(huntData.data);
            this.setState({
              huntName: "",
              location: "",
              userId: "",
              keywords: []
            });
          }
          // if user does not exist
          else {
            let err = "Something went wrong!";
            console.log(err);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="12">
            <h1 className="text-center">Create a Hunt</h1>
            <Form onSubmit={this.handleFormSubmit} action="/api/hunts">
              <FormGroup>
                <Label for="huntName">Hunt Name</Label>
                <Input onChange={this.handleInputChange} value={this.state.huntName} type="text" name="huntName" id="huntName" placeholder="Hunt Name" />
              </FormGroup>
              <FormGroup>
                <Label>Keywords (minimum of 3)</Label>
                <Input onBlur={this.handleInputChange} type="text" name="keyword1" placeholder="Keyword 1" />
              </FormGroup>
              <FormGroup>
                <Input onBlur={this.handleInputChange} type="text" name="keyword2" placeholder="Keyword 2" />
              </FormGroup>
              <FormGroup>
                <Input onBlur={this.handleInputChange} type="text" name="keyword3" placeholder="Keyword 3" />
              </FormGroup>
              <FormGroup>
                <Input onBlur={this.handleInputChange} type="text" name="keyword4" placeholder="Keyword 4" />
              </FormGroup>
              <FormGroup>
                <Input onBlur={this.handleInputChange} type="text" name="keyword5" placeholder="Keyword 5" />
              </FormGroup>
              <FormGroup className="text-center">
                <Button type="submit">Create Hunt</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Create;
