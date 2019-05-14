import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';

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
        console.log(userData)
        if (userData.data != null && userData.data.errmsg == null) {
          console.log(userData.data);
          const { username, completedHunts, inProgressHunts, createdHunts } = userData.data;

          let createdHuntsName = [];
          let completedHuntsName = [];
          let inProgressHuntsName =[];

        for (let i = 0; i < createdHunts.length; i++) {
          createdHuntsName.push(createdHunts[i].huntName);
        };

        for (let i = 0; i < completedHunts.length; i++) {
          completedHuntsName.push(completedHunts[i].huntName);
        };

        for (let i = 0; i < inProgressHunts.length; i++) {
          inProgressHuntsName.push(inProgressHunts[i].huntName);
        };

          this.setState({
            username,
            completedHunts: completedHuntsName,
            inProgressHunts: inProgressHuntsName,
            createdHunts: createdHuntsName
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const created = this.state.createdHunts.map((create) => {
      return <li className="list-group-item">{create}</li>
    });

    const completed = this.state.completedHunts.map((complete) => {
      return <li className="list-group-item">{complete}</li>
    });

    const inProgress = this.state.inProgressHunts.map((progress) => {
      return <li className="list-group-item">{progress}</li>
    })

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="4" sm="12">
            <h1 className="text-center">{this.state.username}</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5" className="text-center">
                Created Hunts
              </CardHeader>
              <ul className="list-group list-group-flush">
                {created}
              </ul>
            </Card>
          </Col>
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5" className="text-center">
                Completed Hunts
              </CardHeader>
              <ul className="list-group list-group-flush">
                {completed}
              </ul>
            </Card>
          </Col>
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5" className="text-center">
                Hunts In Progress
              </CardHeader>
              <ul className="list-group list-group-flush">
                {inProgress}
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Profile;
