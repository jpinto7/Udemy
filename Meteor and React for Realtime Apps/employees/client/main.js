import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeList from './components/EmployeeList';

const App = () => (
  <div className="container">
    <EmployeeList />
  </div>
);

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
