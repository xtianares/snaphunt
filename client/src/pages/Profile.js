import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";

class Profile extends Component {
  state = {
    username: "",
    completedHunts: [],
    inProgressHunts: []
  };

  componentDidMount () {
    API.getUser(this.props.match.params.id) 
      .then(userData => {
        if(userData.data != null && userData.data.errmsg == null) {
          console.log(userData.data);
          const { username, completedHunts, inProgressHunts } = userData.data;
          this.setState({
            username,
            completedHunts,
            inProgressHunts
          });
        }
    })
    .catch(err => console.log(err)); 
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <h1 className="text-center">{this.state.username}</h1>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Profile;
