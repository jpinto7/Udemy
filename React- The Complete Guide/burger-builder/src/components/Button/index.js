import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = props => (
  <button
    className={[styles.Button, styles[props.btnStyle]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  clicked: PropTypes.func,
  btnStyle: PropTypes.string
};

Button.defaultProps = {
  btnStyle: 'Success'
};

export default Button;