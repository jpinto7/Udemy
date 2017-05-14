import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const App = ({ children }) => (
  <div className="container">
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
