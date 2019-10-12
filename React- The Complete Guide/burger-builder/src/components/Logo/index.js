import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import styles from './styles.module.css';

const Logo = props => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default Logo;