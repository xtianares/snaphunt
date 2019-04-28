import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";
import { Redirect } from "react-router-dom";

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class Signup extends Component {
  state = {
    isAuthenticated: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  };

  componentDidMount() {
    this.checkLogin();
  }

  login = (userData) => {
    setCookie("isAuthenticated", "true");
    setCookie("authId", userData._id);
    this.setState({
      isAuthenticated: readCookie("isAuthenticated"),
      redirectToReferrer: true,
      username: "",
      password: ""
    });
  };

  checkLogin = () => {
    if (!this.state.isAuthenticated) {
      console.log("Logged In Status: " + this.state.isAuthenticated)
    }
    else {
      console.log("Logged In Status: " + this.state.isAuthenticated)
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.username && this.state.password) {
      API.saveUser({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          username: (this.state.username).toLowerCase(),
          password: this.state.password
      })
        .then(userData => {
          // console.log(userData.data);
          if(userData.data != null && userData.data.errmsg == null){
            console.log(userData.data);
            this.login(userData.data);
            this.checkLogin();
            this.setState({
              isAuthenticated: true,
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              password: ""
            });
          }
          // if user does not exist
          else {
            let err = "Username already taken!";
            console.log(err);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.isAuthenticated) return <Redirect to={{ pathname: "/" }} />;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="12">
            <h1 className="text-center">Signup</h1>
            <Form onSubmit={this.handleFormSubmit} action="/api/signup">
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input onChange={this.handleInputChange} value={this.state.firstName} type="text" name="firstName" id="firstname" placeholder="First Name" />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input onChange={this.handleInputChange} value={this.state.lastName} type="text" name="lastName" id="lastname" placeholder="Last Name" />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={this.handleInputChange} value={this.state.email} type="email" name="email" id="email" placeholder="your@email.com" />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={this.handleInputChange} value={this.state.username} type="text" name="username" id="username" placeholder="username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={this.handleInputChange} value={this.state.password} type="password" name="password" id="password" placeholder="password" />
              </FormGroup>
              <FormGroup className="text-center">
                <Button type="submit">Signup</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
