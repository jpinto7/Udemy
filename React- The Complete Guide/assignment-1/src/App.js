import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput';
import UserOutput from './UserOutput';

class App extends Component {
  state = {
    username: 'jpinto'
  }

  onNameChange = e => {
    const username = e.target.value;
    this.setState({
      username
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput change={this.onNameChange} username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput />
        <UserOutput />
      </div>
    );
  }
}

export default App;
