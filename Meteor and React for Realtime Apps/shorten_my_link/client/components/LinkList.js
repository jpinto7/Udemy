import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends Component {
  renderRows = () => {
    const { links } = this.props;
    return links.map((link) => {
      const { clicks, token, url } = link;
      const { origin } = window.location;
      const shortLink = `${origin}/${token}`;
      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>{clicks}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('links');
  return {
    links: Links.find({}).fetch(),
  };
}, LinkList);
