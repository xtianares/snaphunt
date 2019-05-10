import React, { Component, Fragment } from "react";
import './scss/App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Capture from "./pages/Capture";
import Create from "./pages/Create";
import Hunts from "./pages/Hunts";
import Snaps from "./pages/Snaps";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile"

class App extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  };

  render() {
    return (
      <Router>
        <Fragment>
          <Nav isAuthenticated={this.state.isAuthenticated} />
          <main>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/create" component={Create} />
              <PrivateRoute exact path="/hunts" component={Hunts} />
              <PrivateRoute exact path="/hunt/:id" component={Hunts} />
              <PrivateRoute exact path="/snaps" component={Snaps} />
              <PrivateRoute exact path="/snap/:id" component={Snaps} />
              <PrivateRoute exact path="/capture" component={Capture} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/capture/:keyword/:huntId" component={Capture} />
              <Route component={NoMatch} />
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
