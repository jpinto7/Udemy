import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Backdrop = (props) => {
  const { show, clicked } = props;
  return show ? <div className={styles.Backdrop} onClick={clicked} /> : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func,
};

Backdrop.defaultProps = {
  show: false,
  clicked: () => {},
};

export default Backdrop;
