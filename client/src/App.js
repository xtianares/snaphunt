import React, { Fragment } from "react";
import './scss/App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Snap from "./pages/Snap";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
      <Router>
        <Fragment>
          <Nav />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
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
