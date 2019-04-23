import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";

class Snap extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    console.log("it mounted");
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-6 sm-12">
            <h1 className="text-center">Snaps, nothing here yet</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Snap;
