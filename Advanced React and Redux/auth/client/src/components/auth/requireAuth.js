import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const requireAuth = (WrappedComponent) => {
  class Authentication extends Component {
    componentWillMount() {
      const { authenticated } = this.props;
      if (!authenticated) {
        this.props.push('/');
      }
    }

    componentWillUpdate({ authenticated }) {
      if (!authenticated) {
        this.props.push('/');
      }
    }

    renderComponent() {
      const { authenticated } = this.props;
      if (authenticated) {
        return <WrappedComponent {...this.props} />;
      }
      return null;
    }

    render() {
      return this.renderComponent();
    }
  }

  const mapStateToProps = ({ auth: { authenticated } }) => ({
    authenticated,
  });

  const mapDispatchToProps = {
    push,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default requireAuth;
