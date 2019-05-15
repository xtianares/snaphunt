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
  Button,
  CardImg,
  CardDeck
} from 'reactstrap';
import API from "../utils/API";


class Snap extends Component {
  state = {
    snaps: [],
    hasSnaps: false
  };

  componentDidMount() {
    console.log("it mounted");
    API.getSnaps(this.props.match.params.id)
      .then(res => {
        let snapsData = res.data;
        console.log(snapsData)
        let snaps = [];
        if (snapsData.length) {
          this.setState({
            hasSnaps: true,
            snaps: snapsData
          })
        }
        console.log(res.data);
        // for (let i = 0; i < snapsData.length; i++) {
        //   snaps.push(snapsData[i].url)
        // }
        // this.setState({ snaps: snaps });
      })
      // .then(console.log("state source" + this.state.snapUrl))
      .catch(err => console.log(err));

    // console.log("state source" + this.state.snapUrl);
  }

  render() {
    const images = this.state.snaps.map((item) => {
      return (
        <Card>
          <CardImg top width="100%" src={item.url} alt="Card image cap" />
          <CardBody>
            <CardText>{item.username}</CardText>
          </CardBody>
        </Card>
      )
    }
    )
    return (

      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" sm="12">
            <h1 className="text-center">{this.state.hasSnaps ? "Uploaded Snaps" : "Snaps, nothing here yet"}</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <CardDeck sm="12"  >
            {images}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

export default Snap;
