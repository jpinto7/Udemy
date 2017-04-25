/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { markdown } from 'markdown';

const BinViewer = ({ bin }) => {
  const { content } = bin;
  return (
    <div className="col-xs-4">
      <h5>Output</h5>
      <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(content) }} />
    </div>
  );
};

BinViewer.propTypes = {
  bin: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string.isRequired,
    sharedWith: PropTypes.arrayOf(PropTypes.string),
    ownerId: PropTypes.string,
  }).isRequired,
};

export default BinViewer;
