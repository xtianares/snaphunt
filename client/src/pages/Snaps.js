import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";

class Snap extends Component {
  state = {
    imageUrls:[]
  };

  componentDidMount() {
    console.log("it mounted");
    API.getSnaps(this.props.match.params.id)
        .then(res =>  {
          let snaps = res.data;
          let imageUrls = [];
          console.log(res.data);
          for(let i=0; i < snaps.length; i++) {
            imageUrls.push(snaps[i].url)
          }
          this.setState({ imageUrls: imageUrls });
        })
        .then(console.log("state source" + this.state.snapUrl))
        .catch(err => console.log(err));

    console.log("state source" + this.state.snapUrl);
  }

  render() {
    const images = this.state.imageUrls.map((item, key) =>
        <img src={item} key={item}/>
    )
    return (
      
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <h1 className="text-center">Snaps, nothing here yet</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            {images}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Snap;
