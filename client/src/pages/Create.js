import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";

class Create extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    userId: localStorage.getItem("authId") || "", // need to grab this from cache
    location: "",
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
      lng: position.coords.longitude,
      lat: position.coords.latitude
    }
    this.setState({ location: currentLocation });
    // console.log(this.state.imageLocation)
    // return currentLocation;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name.indexOf("keyword") >= 0) {
      let theKeys = this.state.keywords;
      // console.log("currentKeys:");
      // console.log(theKeys);
      // console.log("inputValue: " + value);
      // console.log(theKeys.indexOf(value));
      if (value !== '' && value !== null && theKeys.indexOf(value) < 0) {
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
    // console.log(this.state.keywords)
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.huntName && this.state.location && this.state.userId && (this.state.keywords).length >= 3) {
      API.saveHunt({
          huntName: this.state.huntName,
          location: this.state.location,
          userId: this.state.userId,
          keywords: this.state.keywords
      })
        .then(huntData => {
          // console.log(huntData.data);
          if(huntData.data != null && huntData.data.errmsg == null){
            this.setState({
              huntName: "",
              location: "",
              userId: "",
              keywords: []
            });
            console.log(huntData.data);
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
