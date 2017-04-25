import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import LinkCreate from './components/LinkCreate';
import LinkList from './components/LinkList';
import { Links } from '../imports/collections/links';

const App = () => (
  <div>
    <Header />
    <LinkCreate />
    <LinkList />
  </div>
);

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
