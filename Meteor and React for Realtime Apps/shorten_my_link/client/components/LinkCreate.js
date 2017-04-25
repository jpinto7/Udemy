import React, { Component } from 'react';

class LinkCreate extends Component {
  state = {
    error: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.linkInput;
    Meteor.call('links.insert', value, (error) => {
      if (error) {
        this.setState({
          error: 'Enter a valid URL',
        });
      } else {
        this.setState({
          error: '',
        });
        this.linkInput.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="linkInput">Link to shorten</label>
          <input
            className="form-control"
            id="linkInput"
            ref={(input) => { this.linkInput = input; }}
          />
        </div>
        <div className="text-danger">
          {this.state.error}
        </div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;
