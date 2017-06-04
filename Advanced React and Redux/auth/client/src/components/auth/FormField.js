import React from 'react';
import classNames from 'classnames';

const FormField = ({ id, input, label, meta: { touched, error, warning }, placeholder, type, }) => {
  const fieldsetClasses = classNames(
    'form-group',
    {
      'has-success': !(error || warning) && touched,
      'has-danger': !!error && touched,
      'has-warning': !!warning && touched,
    },
  );
  const inputClasses = classNames(
    'form-control',
    {
      'form-control-success': !(error || warning) && touched,
      'form-control-danger': !!error && touched,
      'form-control-warning': !!warning && touched,
    },
  );
  return (
    <fieldset className={fieldsetClasses}>
      <label
        className="form-control-label"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClasses}
        id={id}
        placeholder={placeholder}
        type={type}
        {...input}
      />
      {touched &&
        ((error && <div className="form-control-feedback">{error}</div>) ||
          (warning && <div className="form-control-feedback">{warning}</div>))}
    </fieldset>
  );
};

export default FormField;
