import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px;
  .input-group {
    width: 30%;
  }
  > div {
    margin: 0 10px;
  }
`;

class BinShare extends Component {
  static propTypes = {
    bin: PropTypes.shape({
      _id: PropTypes.string,
      content: PropTypes.string.isRequired,
      sharedWith: PropTypes.arrayOf(PropTypes.string),
      ownerId: PropTypes.string,
    }).isRequired,
  };

  onShareClick = () => {
    const email = this.emailInput.value;
    const { bin: { _id: id } } = this.props;
    Meteor.call('bins.share', id, email);
  }

  emailInputRef = (i) => {
    this.emailInput = i;
  }

  renderShareList() {
    const { bin: { sharedWith } } = this.props;
    return sharedWith.map(email => (
      <button
        className="btn btn-default"
        key={email}
      >
        {email}
      </button>
    ));
  }

  render() {
    return (
      <Footer>
        <div className="input-group">
          <input
            type="email"
            className="form-control"
            ref={this.emailInputRef}
          />
          <div className="input-group-btn">
            <button
              className="btn btn-default"
              onClick={this.onShareClick}
            >
              Share Bin
            </button>
          </div>
        </div>
        <div>
          Shared With:
        </div>
        <div className="btn-group">
          {this.renderShareList()}
        </div>
      </Footer>
    );
  }
}

export default BinShare;
