import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser = (user, index) => (
    <div key={index} className="card">
      <div className="card-block">
        <h4 className="card-title">{user.name}</h4>
        <p className="card-text">Cheese Factory</p>
        <a href="#" className="btn btn-primary">Email</a>
      </div>
    </div>
  )

  render() {
    const { users } = this.props;
    return (
      <div className="user-list">
        {users.map(this.renderUser)}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
