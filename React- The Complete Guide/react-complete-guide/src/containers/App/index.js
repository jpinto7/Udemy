import React, { Component } from 'react';
import Persons from '../../components/Persons';
import Cockpit from '../../components/Cockpit';
import styles from './App.module.css';

class App extends Component {
  state = {
    persons: [
      {
        id: 1,
        name: 'Juan',
        age: 28
      },
      {
        id: 2,
        name: 'Stephanie',
        age: 26
      }
    ],
    showPersons: false
  }

  switchNameHandler = newName => () => {
    this.setState(prevState => {
      const persons = [...prevState.persons];
      persons[0].name = newName;
      return { persons };
    });
  }

  nameChangedHandler = id => event => {
    const persons = [...this.state.persons];
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    persons[personIndex].name = event.target.value;
    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  deletePersonHandler = index => () => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  render() {
    return (
      <div className={styles.App}>
        <Cockpit
          clicked={this.togglePersonsHandler}
        />
        <Persons
          data={this.state.persons}
          showPersons={this.state.showPersons}
          changed={this.nameChangedHandler}
          clicked={this.deletePersonHandler}
        />
      </div>      
    );
  }
}

export default App;
