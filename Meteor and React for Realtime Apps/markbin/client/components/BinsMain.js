import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../imports/collections/bins';
import BinEditor from './BinEditor';
import BinViewer from './BinViewer';
import BinShare from './BinShare';

class BinsMain extends Component {
  static propTypes = {
    bin: PropTypes.shape({
      _id: PropTypes.string,
      content: PropTypes.string.isRequired,
      sharedWith: PropTypes.arrayOf(PropTypes.string),
      ownerId: PropTypes.string,
    }),
  }

  static defaultProps = {
    bin: {
      content: '',
      sharedWith: [],
    },
  }

  render() {
    const { bin } = this.props;
    return (
      <div>
        <BinEditor bin={bin} />
        <BinViewer bin={bin} />
        <BinShare bin={bin} />
      </div>
    );
  }
}

export default createContainer(({ params }) => {
  const { binId } = params;
  const binsSubscription = Meteor.subscribe('bins');
  const sharedBinsSubscription = Meteor.subscribe('sharedBins');
  const loading = !binsSubscription.ready() || !sharedBinsSubscription.ready();
  const bin = Bins.findOne(binId);
  return { loading, bin };
}, BinsMain);
