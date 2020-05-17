import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

const submit = values => {
  console.log('submitting form', values);
};

const renderInput = ({
  input: { onChange, ...restInput },
  placeholder,
  type,
}) => {
  return (
    <TextInput
      secureTextEntry={type === 'password'}
      placeholder={placeholder}
      style={styles.input}
      onChangeText={onChange}
      {...restInput}
    />
  );
};

const RegisterForm = ({ handleSubmit }) => (
  <View style={styles.container}>
    <Text>Nombre:</Text>
    <Field
      name="name"
      placeholder="Ingresa tu nombre"
      component={renderInput}
    />
    <Text>Email:</Text>
    <Field
      name="email"
      placeholder="Ingresa tu email"
      component={renderInput}
    />
    <Text>Contraseña:</Text>
    <Field
      name="password"
      placeholder="Ingresa tu contraseña"
      component={renderInput}
      type="password"
    />
    <Text>Confirmar contraseña:</Text>
    <Field
      name="passwordConfirmation"
      placeholder="Reconfirma tu contraseña"
      component={renderInput}
      type="password"
    />
    <TouchableOpacity onPress={handleSubmit(submit)}>
      <Text style={styles.button}>Submit</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  button: {},
});

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'register',
})(RegisterForm);
