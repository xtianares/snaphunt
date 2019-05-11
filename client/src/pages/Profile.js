import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";

class Profile extends Component {
  state = {
    username: "",
    createdHunts: [],
    completedHunts: [],
    inProgressHunts: []
  };

  componentDidMount() {
    console.log("it mounted");
    API.getUser(this.props.match.params.id)
      .then(userData => {
        let huntsCreated = userData.data;
        let createdHunts = [];

        for (let i = 0; i < huntsCreated.length; i++) {
          createdHunts.push(huntsCreated[i].createdHunts);
        };

        let huntsCompleted = userData.data;
        let completedHunts = [];

        for (let i = 0; i < huntsCompleted.length; i++) {
          completedHunts.push(huntsCompleted[i].completedHunts);
        };

        let huntsInProgress = userData.data;
        let inProgressHunts = [];

        for (let i = 0; i < huntsInProgress.length; i++) {
          inProgressHunts.push(huntsInProgress[i].inProgressHunts);
        };

        if (userData.data != null && userData.data.errmsg == null) {
          console.log(userData.data);
          const { username, completedHunts, inProgressHunts, createdHunts } = userData.data;
          this.setState({
            username,
            completedHunts: completedHunts,
            inProgressHunts: inProgressHunts,
            createdHunts: createdHunts
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const created = this.state.createdHunts.map((create) => {
      return <p>{create}</p>
    });

    const completed = this.state.completedHunts.map((complete) => {
      return <p>{complete}</p>
    });

    const inProgress = this.state.inProgressHunts.map((progress) => {
      return <p>{progress}</p>
    })

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <h1 className="text-center">{this.state.username}</h1>
          </Col>
        </Row>
    
        <Row className="justify-content-md-center">
          <Col>
            <h3 className="text-center">Created Hunts</h3>
            <p>
              {created}
            </p>
          </Col>
          <Col>
            <h3 className="text-center">Completed Hunts</h3>
            <p>
              {completed}
            </p>
          </Col>
          <Col>
            <h3 className="text-center">Hunts In Progress</h3>
            <p>
              {inProgress}
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Profile;
