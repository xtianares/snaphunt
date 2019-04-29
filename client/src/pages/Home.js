import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import GoogleMap from "../components/Map";
import API from "../utils/API";


class Home extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  // componentDidMount() {
  //   console.log("it mounted");
  // }

  render() {
    return (
      <GoogleMap />
    );
  }
}

export default Home;
