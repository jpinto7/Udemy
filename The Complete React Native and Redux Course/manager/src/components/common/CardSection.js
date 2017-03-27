/* @flow */

import React, { PropTypes } from 'react';
// import { View } from 'react-native';
import styled from 'styled-components/native';

const CardSectionContainer = styled.View`
  border-bottom-width: 1;
  padding: 5;
  background-color: #ffffff;
  justify-content: flex-start;
  flex-direction: ${props => (props.flexDirectionColumn ? 'column' : 'row')};
  border-color: #dddddd;
  position: relative;
`;

// const styles = {
//   cardSectionContainer: {
//     borderBottomWidth: 1,
//     padding: 5,
//     backgroundColor: '#ffffff',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     borderColor: '#dddddd',
//     position: 'relative',
//   },
// };

const CardSection = ({ children, flexDirectionColumn }) => (
  <CardSectionContainer flexDirectionColumn={flexDirectionColumn}>
    {children}
  </CardSectionContainer>
);

CardSection.propTypes = {
  children: PropTypes.node,
};

export { CardSection };
