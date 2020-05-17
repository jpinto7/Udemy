import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({ children, clicked, btnStyle, ...otherProps }) => (
  <button
    className={[styles.Button, styles[btnStyle]].join(' ')}
    onClick={clicked}
    {...otherProps}
  >
    {children}
  </button>
);

Button.propTypes = {
  clicked: PropTypes.func,
  btnStyle: PropTypes.string,
};

Button.defaultProps = {
  btnStyle: 'Success',
};

export default Button;
