import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../imports/collections/bins';

const BinItem = styled.li`
  height: 55px;
`;

class BinsList extends Component {
  static propTypes = {
    bins: PropTypes.arrayOf(PropTypes.shape({
      ownerId: PropTypes.string,
    })).isRequired,
  }

  onBinRemove = bin => () => {
    Meteor.call('bins.remove', bin);
  }

  renderList() {
    const { bins } = this.props;
    return bins.map((bin) => {
      const { _id: id } = bin;
      return (
        <BinItem
          key={id}
          className="list-group-item"
        >
          <Link to={`/bins/${id}`}>Bin {id}</Link>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={this.onBinRemove(bin)}
            >
              Remove
            </button>
          </span>
        </BinItem>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  }
}

export default createContainer(() => {
  const binsSubscription = Meteor.subscribe('bins');
  const sharedBinsSubscription = Meteor.subscribe('sharedBins');
  const loading = !binsSubscription.ready() || !sharedBinsSubscription.ready();
  const bins = Bins.find({}).fetch();
  return { loading, bins };
}, BinsList);
