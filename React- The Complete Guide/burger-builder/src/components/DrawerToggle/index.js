import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DrawerToggle = props => {
  const { clicked } = props;
  return (
    <div className={styles.DrawerToggle} onClick={clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func,
};

DrawerToggle.defaultProps = {
  clicked: () => {},
};

export default DrawerToggle;
