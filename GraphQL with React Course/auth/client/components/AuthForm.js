import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Errors = styled.div`
  color: red;
`;

class AuthForm extends Component {
  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
    })).isRequired,
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

  renderErrorMessages = () => {
    const { errors } = this.props;
    return errors.map(error => <div key={error}>{error}</div>);
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
          <Errors>
            {this.renderErrorMessages()}
          </Errors>
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
