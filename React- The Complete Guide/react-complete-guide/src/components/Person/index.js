import React from 'react';
import styles from './Person.module.css';

const person = ({ name, age, clicked, changed }) => (
  <div className={styles.Person}>
    <h1 onClick={clicked}>{name}</h1>
    <h2>{age}</h2>
    <input type="text" onChange={changed} value={name} />
  </div> 
);

export default person;
