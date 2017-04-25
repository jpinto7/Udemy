import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class BinEditor extends Component {
  static propTypes = {
    bin: PropTypes.shape({
      _id: PropTypes.string,
      content: PropTypes.string.isRequired,
      sharedWith: PropTypes.arrayOf(PropTypes.string),
      ownerId: PropTypes.string,
    }).isRequired,
  };

  onEditorChange = (content) => {
    const { bin } = this.props;
    Meteor.call('bins.update', bin._id, content);
  }

  render() {
    const { bin } = this.props;
    return (
      <div className="col-xs-8">
        <h5>Input</h5>
        <CodeMirror
          onChange={this.onEditorChange}
          options={{ mode: 'markdown', lineNumbers: true }}
          value={bin.content}
        />
      </div>
    );
  }
}

export default BinEditor;
