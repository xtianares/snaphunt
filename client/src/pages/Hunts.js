import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import API from "../utils/API";

class Hunt extends Component {
  state = {
    huntId: "",
    huntName: "",
    location: {},
    keywords: [],
    userId: localStorage.getItem("authId") || "",
    userName: "",
    activeKeywords: false
  };

  componentDidMount() {
    console.log(this.state)
    // console.log("it mounted");
    // console.log(this.props.match.params.id);
    API.getHunt(this.props.match.params.id)
      .then(huntData => {
        // console.log(userData.data);
        if(huntData.data != null && huntData.data.errmsg == null){
          console.log(huntData.data);
          const { _id, huntName, location, keywords, user } = huntData.data;
          this.setState({
            huntId: _id,
            huntName,
            location,
            keywords,
            userName: user.username
          })
          console.log(this.state)
        }
      })
      .catch(err => console.log(err));
  }

  playHunt() {
    console.log(this.state);
    let huntData = {
      _id: this.state.huntId,
      keywords: this.state.keywords
    }
    API.playHunt(this.state.userId, huntData)
      .then(userData => {
        // console.log(userData.data);
        if(userData.data != null && userData.data.errmsg == null){
          console.log(userData.data);
          // const { _id, huntName, location, keywords, user } = userData.data;
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const keywords = this.state.keywords;
    const listItems = keywords.map(keyword => {
      const theUrl = `/capture/?keyword=${keyword}&huntId=${this.state.huntId}`;
      return <a key={keyword} className="btn btn-outline-success keyword" href={theUrl}>{keyword}</a>;
    });

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <Card>
              <CardHeader tag="h5">
                {this.state.huntName}
                <small className="mt-1 text-muted float-right font-weight-lighter font-italic">Created by: {this.state.userName}</small>
              </CardHeader>
              <CardBody>
                <CardTitle>Match the keywords below to complete the hunt.</CardTitle>
                {listItems}
              </CardBody>
              <CardFooter>
                <Button onClick={this.playHunt.bind(this)}>Start Hunt</Button> <small className="mt-2 ml-2 text-muted font-weight-lighter font-italic">to activate the buttons above</small>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Hunt;
