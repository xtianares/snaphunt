import React, { Component } from 'react';

class Footer extends Component {
  render() {
    let year = new Date().getFullYear();
    return (
      <footer className="footer mt-auto py-3">
        <div className="container-fluid text-center text-light text-muted">
          <div className="row d-flex align-items-center">
            <div className="col-md-3 text-md-left">
              Built with React
            </div>
            <div className="col-md-6 text-center">
              <span>Copyright &#169; {year} -  SnapHunt</span>
            </div>
            <div className="col-md-3 text-md-right">
              <a href="https://github.com/xtianares/snaphunt">View in Github</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
