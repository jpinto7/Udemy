import React, { Component } from 'react';

import requireAuthentication from './requireAuthentication';

class Resources extends Component {
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
