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
    // this.checkLogin();
  }

  checkLogin = () => {
    API.checkLogin()
      .then(res =>
        this.setState({ books: res.data, username: "", password: ""})
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.checkLogin({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => console.log("Logged In"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-6 sm-12">
            <h1 className="text-center">Login</h1>
              <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input type="email" name="username" id="username" placeholder="username" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="password" />
                </FormGroup>
                <Button>Login</Button>
              </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
