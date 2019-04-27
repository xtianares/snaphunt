import React from "react";

function Nav() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center">
            <i data-feather="camera"></i>&nbsp;SnapHunt
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/map/">Map</a></li>
              <li className="nav-item"><a className="nav-link" href="/snaps/">Snaps</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
