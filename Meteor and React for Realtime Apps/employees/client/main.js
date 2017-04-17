import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>Hello there!</div>
);

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
