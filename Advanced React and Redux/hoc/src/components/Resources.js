import React, { Component } from 'react';
import PropTypes from 'prop-types';

import requireAuthentication from './requireAuthentication';

class Resources extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillUpdate(newProps) {
    const { authenticated } = this.props;
    if (authenticated && !newProps.authenticated) {
      this.props.push('/');
    }
  }

  render() {
    return (
      <div>
        Special Recipe
        <ul>
          <li>1 cups</li>
          <li>2 cups</li>
          <li>3 cups</li>
        </ul>
      </div>
    );
  }
}

export default requireAuthentication(Resources);
