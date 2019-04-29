import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class Nav extends Component {
  state = {
    isAuthenticated: this.props.isAuthenticated || false
  };

  componentDidMount = () => {
    console.log("Login: " + this.state.isAuthenticated);
  }

  logout = () => {
    setCookie("isAuthenticated", false, -1);
    setCookie("authId", false, -1);
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <i data-feather="camera"></i>&nbsp;SnapHunt
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/map/">Map</a></li>
                <li className="nav-item"><a className="nav-link" href="/snaps/">Snaps</a></li>
                {this.state.isAuthenticated ? <li className="nav-item"><a className="nav-link" href="/" onClick={this.logout}>Logout</a></li> : null}
              </ul>
            </div>
        </nav>
      </header>
    );
  }
}

export default Nav;
