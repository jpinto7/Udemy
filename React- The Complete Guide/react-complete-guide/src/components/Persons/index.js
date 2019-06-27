import React from 'react';
import Person from '../Person';
import ErrorBoundary from '../ErrorBoundary';

const persons = ({ showPersons, data, changed, clicked }) => {
  const people = showPersons ? data.map((person, index) => (
    <ErrorBoundary key={person.id}>
      <Person
        {...person}
        changed={changed(person.id)}
        clicked={clicked(index)}
      />
    </ErrorBoundary>)) : null;
  return people;
}

export default persons;
