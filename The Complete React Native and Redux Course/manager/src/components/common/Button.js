/* @flow */

import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const ButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 5;
  border-width: 1;
  border-color: #007aff;
  margin-left: 5;
  margin-right: 5;
  justify-content: center;
  max-height: 43;
`;

const ButtonText = styled.Text`
  align-self: center;
  color: #007aff;
  font-size: 16;
  font-weight: 600;
  padding-top: 10;
  padding-bottom: 10;
`;

const Button = ({ children, onPress }) => (
  <ButtonWrapper onPress={onPress}>
    <ButtonText>{children}</ButtonText>
  </ButtonWrapper>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export { Button };
