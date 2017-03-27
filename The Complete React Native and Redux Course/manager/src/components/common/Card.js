/* @flow */

import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  border-width: 1;
  border-radius: 2;
  border-color: #dddddd;
  border-bottom-width: 0;
  shadow-color: #000000;
  shadow-offset: 0 2;
  shadow-opacity: 0.1;
  shadow-radius: 2;
  elevation: 1;
  margin-left: 5;
  margin-right: 5;
  margin-top: 10;
`;

const Card = ({ children }) => (
  <CardContainer>
    {children}
  </CardContainer>
);

Card.propTypes = {
  children: PropTypes.node,
};

export { Card };
