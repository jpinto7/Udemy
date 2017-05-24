import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="container">
      {children}      
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
