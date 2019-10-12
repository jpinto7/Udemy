import React from 'react';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

const App = () => (
  <div>
    <Layout>
      <BurgerBuilder />
    </Layout>
  </div>
);

export default App;
