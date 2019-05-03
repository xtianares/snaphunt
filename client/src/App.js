import React, { Component, Fragment } from "react";
import './scss/App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Capture from "./pages/Capture";
import Snaps from "./pages/Snaps";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class App extends Component {
  state = {
    isAuthenticated: readCookie("isAuthenticated") || false,
  };

  render() {
    return (
      <Router>
        <Fragment>
          <Nav isAuthenticated={this.state.isAuthenticated} />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute path="/snaps" component={Snaps} />
              <Route exact path="/capture" component={Capture} />
              <Route exact path="/snap/:id" component={Snaps} />
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
