import React, { PropTypes } from 'react';
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
  children: PropTypes.node,
};

export default App;
