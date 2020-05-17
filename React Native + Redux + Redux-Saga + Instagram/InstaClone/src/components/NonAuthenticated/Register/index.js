import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';
import RegisterForm from '../Forms/RegisterForm';

const Register = props => {
  const { navigation } = props;
  return (
    <View style={styles.viewContainer}>
      <RegisterForm />
      <Button
        title="Ya tienes una cuenta? Inicia sesión ahora!"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30c5ff',
  },
});

Register.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Register);
