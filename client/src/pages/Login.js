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
      console.log("Not Logged In")
    }
    else {
      console.log("Logged In? " + this.state.loggedIn)
    }

    // API.checkLogin()
    //   .then(res =>
    //     this.setState({ loggedIn: true, username: "", password: ""})
    //   )
    //   .catch(err => console.log(err));
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
      // code below will need to be on the .then form API
      console.log("Username? " + this.state.username)
      console.log("Password? " + this.state.password)
      this.setState({ loggedIn: true, username: "", password: ""})
      this.checkLogin();

      // API.login({
      //   username: this.state.username,
      //   password: this.state.password
      // })
      //   .then(res => console.log("Logged In"))
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-6 sm-12">
            <h1 className="text-center">Login</h1>
              <Form onSubmit={this.handleFormSubmit} action="test">
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input onChange={this.handleInputChange} value={this.state.username} type="text" name="username" id="username" placeholder="username" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input onChange={this.handleInputChange} value={this.state.password} type="password" name="password" id="password" placeholder="password" />
                </FormGroup>
                <Button type="submit">Login</Button>
              </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
