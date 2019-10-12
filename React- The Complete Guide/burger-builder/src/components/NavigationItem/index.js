import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const NavigationItem = props => (
  <li className={styles.NavigationItem}>
    <a
      className={props.active ? styles.active : null}
      href={props.link}
    >
      {props.children}
    </a>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string
};

export default NavigationItem;
