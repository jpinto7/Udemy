/* @flow */

import React, { PropTypes } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const SpinnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Spinner = ({ size }) => (
  <SpinnerContainer>
    <ActivityIndicator size={size} />
  </SpinnerContainer>
);

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
};

export { Spinner };
