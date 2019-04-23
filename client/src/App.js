import React, { Fragment } from "react";
import './scss/App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Snap from "./pages/Snap";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
      <Router>
        <Fragment>
          <Nav />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute path="/snaps" component={Snap} />
              <Route exact path="/snaps" component={Snap} />
              <Route exact path="/snap/:id" component={Snap} />
              <Route component={NoMatch} />
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
  );
}

export default App;
