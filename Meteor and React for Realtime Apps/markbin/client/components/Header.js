/* eslint-disable jsx-a11y/href-no-hash */

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Accounts from './Accounts';

class Header extends Component {
  onBinClick = (event) => {
    event.preventDefault();
    Meteor.call('bins.insert', (error, binId) => {
      if (!error) {
        browserHistory.push(`/bins/${binId}`);
      }
    });
  }

  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link
            className="navbar-brand"
            to="/"
          >
            MarkBin
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
          <li>
            <a
              href="#"
              onClick={this.onBinClick}
            >
              Create Bin
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
