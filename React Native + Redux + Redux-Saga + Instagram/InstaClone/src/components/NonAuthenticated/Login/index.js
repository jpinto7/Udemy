import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, StyleSheet } from 'react-native';

const Login = props => {
  const { navigation } = props;
  return (
    <View style={styles.viewContainer}>
      <Text>Login screen</Text>
      <Button
        title="No tienes una cuenta? Regístrate ahora!"
        onPress={() => {
          navigation.navigate('Register');
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

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
