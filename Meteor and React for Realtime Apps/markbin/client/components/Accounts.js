import React, { Component } from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

const AccountsLink = styled.div`
  #login-buttons {
    margin: 18px;
    font-size: 14px;
  }
`;

class Accounts extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, findDOMNode(this.containerRef));
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  saveContainerRef = (i) => {
    this.containerRef = i;
  }

  render() {
    return (
      <AccountsLink ref={this.saveContainerRef} />
    );
  }
}

export default Accounts;
