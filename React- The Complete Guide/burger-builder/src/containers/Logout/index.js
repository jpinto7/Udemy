import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth as authActions } from '../../store/actions';

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, []);
  return <Redirect to="/" />;
};

export default connect(null, authActions)(Logout);
