import React, { Component } from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
