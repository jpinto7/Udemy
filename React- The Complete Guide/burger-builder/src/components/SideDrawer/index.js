import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../Backdrop';
import styles from './styles.module.css';

const SideDrawer = props => {
  const { open, closed } = props;
  const attachedClasses = [styles.SideDrawer, styles.Close];
  if (open) {
    attachedClasses[1] = styles.Open;
  }
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
};

export default SideDrawer;
