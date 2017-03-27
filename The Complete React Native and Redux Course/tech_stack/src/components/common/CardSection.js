/* @flow */

import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const CardSectionContainer = styled.View`
  border-bottom-width: 1;
  padding: 5;
  background-color: #ffffff;
  justify-content: flex-start;
  flex-direction: row;
  border-color: #dddddd;
  position: relative;
`;

const CardSection = ({ children }) => (
  <CardSectionContainer>
    {children}
  </CardSectionContainer>
);

CardSection.propTypes = {
  children: PropTypes.node,
};

export { CardSection };
