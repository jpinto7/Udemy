/* @flow */

import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
  height: 60;
  padding-top: 15;
  shadow-color: #000000;
  shadow-offset: 0 2;
  shadow-opacity: 0.2;
  elevation: 2;
  position: relative;
`;

const HeaderTitle = styled.Text`
  font-size: 20;
`;

const Header = ({ headerText }) => (
  <HeaderContainer>
    <HeaderTitle>
      {headerText}
    </HeaderTitle>
  </HeaderContainer>
);


Header.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export { Header };
