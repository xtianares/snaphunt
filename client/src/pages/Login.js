import React, { Component } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";

class Login extends Component {
  state = {
    loggedIn: false,
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
    if (this.state.username && this.state.password) {
      API.loginUser({
          username: this.state.username,
          password: this.state.password
      })
        .then(userData => {
          // console.log(userData.data);
          if(userData.data != null){
            this.setState({ loggedIn: true, username: "", password: ""});
            this.checkLogin();
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
    return (
      <Container>
        <Row>
          <Col size="md-6 sm-12">
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
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
