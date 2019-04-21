import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";

class Signup extends Component {
  state = {
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  };

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (!this.state.loggedIn) {
      console.log("Logged In Status: " + this.state.loggedIn)
    }
    else {
      console.log("Logged In Status: " + this.state.loggedIn)
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
          username: this.state.username,
          password: this.state.password
      })
        .then(userData => {
          // console.log(userData.data);
          if(userData.data != null && userData.data.errmsg == null){
            this.setState({
              loggedIn: true,
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              password: ""
            });
            this.checkLogin();
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
    return (
      <Container>
        <Row>
          <Col size="md-6 sm-12">
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
