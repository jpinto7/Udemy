import React from 'react';
import styles from './Cockpit.module.css';

const cockpit = ({ clicked }) => (
  <div className={styles.Cockpit}>
    <h1>I'm in React</h1>
    <button onClick={clicked}>Switch Name</button>
  </div>
);

export default cockpit;
