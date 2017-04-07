import React, { Component, PropTypes } from 'react';

class AuthForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        this.setState({
          email: value,
        });
        break;
      case 'password':
        this.setState({
          password: value,
        });
        break;
      default:
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="row">
        <form
          className="col s4"
          onSubmit={this.handleOnSubmit}
        >
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-field">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
