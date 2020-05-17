import React from 'react';
import styles from './styles.module.css';

const Input = ({ label, value, touched, valid, shouldValidate, elementType, elementConfig, onChange }) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [styles.InputElement];
  if (!valid && touched && shouldValidate) {
    inputClasses.push(styles.Invalid);
    validationError = <p className={styles.ValidationError}>Please enter a valid value</p>;
  }
  switch (elementType) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={onChange} />;
      break;
    case 'textarea':
      inputElement = <textarea className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={onChange} />;
      break;
    case 'select':
      inputElement = <select className={inputClasses.join(' ')} value={value} onChange={onChange}>{elementConfig.options.map(({ value: optionValue, display }) => <option key={optionValue} value={optionValue}>{display}</option>)}</select>;
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} />;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
