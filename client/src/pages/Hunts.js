import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";

class Snap extends Component {
  state = {
    huntId: "",
    huntName: "",
    location: {},
    keywords: [],
    user: ""
  };

  componentDidMount() {
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
            user: user.username
          })
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const keywords = this.state.keywords;
    // const captureUrl = (keyword) => {
    //   const theUrl = `/capture/?keyword=${keyword}&huntId=${this.state.huntId}`;
    //   return <li><a href={theUrl} key={keyword}>{keyword}</a></li>;
    // }
    const listItems = keywords.map(keyword => {
      const theUrl = `/capture/?keyword=${keyword}&huntId=${this.state.huntId}`;
      return <li key={keyword}><a href={theUrl}>{keyword}</a></li>;
    });

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <h1 className="text-center">{this.state.huntName}</h1>
            <p>
              Created by {this.state.user}
            </p>
            <ul>{listItems}</ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Snap;
