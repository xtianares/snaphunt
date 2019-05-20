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
    // console.log(this.state)
    // console.log("it mounted");
    // console.log(this.props.match.params.id);
    API.getHunt(this.props.match.params.id)
      .then(huntData => {
        // console.log(userData.data);
        if(huntData.data != null && huntData.data.errmsg == null){
          // console.log(huntData.data);
          const { _id, huntName, location, keywords, user } = huntData.data;

          const keywordsObject = {};
          keywords.forEach(element => {
            keywordsObject[element] = false;
          });

          this.setState({
            huntId: _id,
            huntName,
            location,
            keywords: keywordsObject,
            userName: user.username
          })
          console.log(this.state.keywords)
        }
      })
      .then (huntData => {
        API.getUser(this.state.userId)
          .then(userData => {
            // console.log(userData.data);
            let {completedHunts, inProgressHunts} = userData.data;
            if(userData.data != null && userData.data.errmsg == null) {
              let inProgressHuntIndex = inProgressHunts.findIndex(item => item._id == this.state.huntId);
              if (inProgressHunts && inProgressHuntIndex > -1){
                let theIndex = inProgressHunts.findIndex(item => item._id == this.state.huntId);
                this.setState({
                  keywords: inProgressHunts[inProgressHuntIndex].keywords,
                  activeKeywords: true
                })
                console.log(this.state.keywords)
              }
              let completedHuntsIndex = completedHunts.findIndex(item => item._id == this.state.huntId);
              if (completedHunts && completedHuntsIndex > -1){
                const keywordsObject = {};
                (completedHunts[completedHuntsIndex].keywords).forEach(element => {
                  keywordsObject[element] = true;
                });
                this.setState({
                  keywords: keywordsObject,
                  activeKeywords: true
                })
                console.log(this.state.keywords)
              }
              // console.log(inProgressHunts);
              // console.log(this.state.keywords);
              // if (inProgressHunts.length > 0) {
              //   // Object.keys(inProgressHunts).map(function(key, index) {
              //   //   console.log(inProgressHunts[key]._id === Hunt.state.huntId);
              //   // });
              //
              //   inProgressHunts.forEach(item => {
              //     if (item._id == this.state.huntId) {
              //       // const keywordsArray = item.keywords;
              //       // let keys = Object.keys(keywords);
              //       // let keys = Object.entries(keywords);
              //       // console.log(Object.entries(keywords));
              //
              //       this.setState({
              //         keywords: item.keywords,
              //         activeKeywords: true
              //       })
              //       console.log(this.state.keywords)
              //
              //       // this.setState({
              //       //   keywords: Object.entries(keywords)
              //       // })
              //       // console.log(this.state.keywords);
              //
              //       // let filtered = keys.filter(function(key) {
              //       //   return keywords[key]
              //       // });
              //       // console.log(filtered);
              //     }
              //   })
              // }
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  playHunt() {
    console.log(this.state);
    API.getUser(this.state.userId)
      .then(userData => {
        let {inProgressHunts} = userData.data;
        if(userData.data != null && userData.data.errmsg == null && inProgressHunts) {
          let unique = true;
          if (inProgressHunts.length > 0) {
            inProgressHunts.forEach(item => {
              // console.log(item._id);
              // console.log(this.state.huntId);
              if (item._id == this.state.huntId) {
                unique = false;
                // return;
              }
            });
          }
          // console.log(userData.data);
          // console.log(inProgressHunts);

          if (unique) {
            // const keywords = {};
            // (this.state.keywords).forEach(element => {
            //   keywords[element] = false;
            // });
            // console.log(keywords);
            let huntData = {
              _id: this.state.huntId,
              huntName: this.state.huntName,
              keywords: this.state.keywords
            }
            API.playHunt(this.state.userId, huntData)
              .then(userData => {
                // console.log(userData.data);
                if(userData.data != null && userData.data.errmsg == null){
                  console.log(userData.data);
                  // localStorage.setItem("currentHunt", this.state.huntId)
                  this.setState({
                    activeKeywords: true
                  })
                  // window.location.reload();
                }
              })
              .catch(err => console.log(err));
          }
          else {
            console.log("Hunt is already in progress!");
          }
        }
    })
    .catch(err => console.log(err));
  }

  render() {
    const keywords = this.state.keywords;
    const keywordItems = Object.entries(keywords).map((keyword, index) => {
      const theUrl = `/capture/?keyword=${keyword[0]}&huntId=${this.state.huntId}`;
      if (this.state.activeKeywords) {
        if (keyword[1]) {
          return <button key={keyword} className="btn btn-outline-success keyword matched" disabled><i className="material-icons">done</i> {keyword}</button>;
        }
        else {
          return <a key={keyword} className="btn btn-outline-success keyword" href={theUrl}>{keyword}</a>;
        }
      }
      else {
        return <button key={keyword} className="btn btn-outline-success keyword" disabled>{keyword}</button>;
      }
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
                {keywordItems}
              </CardBody>
              {
                this.state.activeKeywords ? null :
                <CardFooter>
                  <Button onClick={this.playHunt.bind(this)}>Start Hunt</Button> <small className="mt-2 ml-2 text-muted font-weight-lighter font-italic">to activate the buttons above</small>
                </CardFooter>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Hunt;
