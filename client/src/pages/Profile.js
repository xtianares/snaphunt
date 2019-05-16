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

          // let createdHuntsName = [];
          // let completedHuntsName = [];
          // let inProgressHuntsName =[];
          //
          // for (let i = 0; i < createdHunts.length; i++) {
          //   createdHuntsName.push(createdHunts[i].huntName);
          // };
          //
          // for (let i = 0; i < completedHunts.length; i++) {
          //   completedHuntsName.push(completedHunts[i].huntName);
          // };
          //
          // for (let i = 0; i < inProgressHunts.length; i++) {
          //   inProgressHuntsName.push(inProgressHunts[i].huntName);
          // };

          this.setState({
            username,
            completedHunts,
            inProgressHunts,
            createdHunts
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const created = this.state.createdHunts.map((createdHunt) => {
      return <a key={createdHunt._id} href={`/hunt/${createdHunt._id}`} className="list-group-item list-group-item-action">{createdHunt.huntName}</a>
    });

    const completed = this.state.completedHunts.map((completedHunt) => {
      return <a key={completedHunt._id} href={`/hunt/${completedHunt._id}`} className="list-group-item list-group-item-action">{completedHunt.huntName}</a>
    });

    const inProgress = this.state.inProgressHunts.map((inProgressHunt) => {
      return <a key={inProgressHunt._id} href={`/hunt/${inProgressHunt._id}`} className="list-group-item list-group-item-action">{inProgressHunt.huntName}</a>
    })

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="12" md="8" xl="12">
            <h1 className="mb-4">{this.state.username}, here's your current stats.</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5">
                Created Hunts
              </CardHeader>
              <ul className="list-group list-group-flush">
                {created}
              </ul>
            </Card>
          </Col>
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5">
                Completed Hunts
              </CardHeader>
              <ul className="list-group list-group-flush">
                {completed}
              </ul>
            </Card>
          </Col>
          <Col md="8" xl="4" sm="12">
            <Card className="profile-card">
              <CardHeader tag="h5">
                In Progress Hunts
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
