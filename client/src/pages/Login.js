import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    redirectToReferrer: false,
    username: "",
    password: ""
  };

  login = (userData) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("authId", userData._id);
    this.setState({
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirectToReferrer: true,
      username: "",
      password: ""
    });
  };

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (!this.state.loggedIn) {
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
    if (this.state.username && this.state.password) {
      API.loginUser({
          username: (this.state.username).toLowerCase(),
          password: this.state.password
      })
        .then(userData => {
          // console.log(userData.data);
          if(userData.data != null){
            this.login(userData.data);
            this.checkLogin();
            window.location.reload();
          }
          // if user does not exist
          else {
            let err = "Please check your username and password.";
            console.log(err);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={{ pathname: "/" }} />;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="12">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={this.handleFormSubmit} action="/api/login">
              <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={this.handleInputChange} value={this.state.username} type="text" name="username" id="username" placeholder="username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={this.handleInputChange} value={this.state.password} type="password" name="password" id="password" placeholder="password" />
              </FormGroup>
              <FormGroup className="text-center">
                <Button type="submit">Login</Button>
              </FormGroup>
              <FormGroup className="sign-up text-center">
                Don't have an account? <a href="/signup/">Sign up here!</a>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
