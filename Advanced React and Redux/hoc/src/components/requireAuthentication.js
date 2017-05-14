import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      push: PropTypes.func.isRequired,
    }

    componentWillMount() {
      const { authenticated, push } = this.props;
      if (!authenticated) {
        this.props.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ authenticated }) => ({
    authenticated,
  });

  const mapDispatchToProps = {
    push,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};
