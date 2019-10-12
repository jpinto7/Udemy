import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import NavigationItems from '../NavigationItems';
import Logo from '../Logo';
import DrawerToggle from '../DrawerToggle';

const Toolbar = props => {
  const { drawerToggleClick } = props;
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggleClick} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  drawerToggleClick: PropTypes.func,
};

export default Toolbar;
