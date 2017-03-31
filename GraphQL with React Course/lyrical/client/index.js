import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongsList from './components/SongsList';

const client = new ApolloClient({});

const Root = () => (
  <ApolloProvider client={client}>
    <SongsList />
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
