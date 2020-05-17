import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const NavigationItem = props => (
  <li className={styles.NavigationItem}>
    <NavLink
      exact={props.exact}
      activeClassName={styles.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string
};

export default NavigationItem;
