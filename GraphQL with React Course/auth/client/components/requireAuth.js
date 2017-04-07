import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import query from '../queries/CurrentUser';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    static propTypes = {
      data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        user: PropTypes.shape({
          email: PropTypes.string.isRequired,
        }),
      }).isRequired,
    }

    componentWillUpdate({ data }) {
      const { loading, user } = data;
      if (!loading && !user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(query)(RequireAuth);
};
