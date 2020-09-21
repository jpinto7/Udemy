import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import Color from '../utils/Colors';
import Constants from '../const/Constants';

const EmailTextField = ({ term, placeholder, onChange, onValidate, error }) => {
  return (
    <View>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.textFieldView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textField}
          placeholder={placeholder}
          placeholderTextColor={Color.lightishgray}
          value={term}
          onChangeText={onChange}
          onEndEditing={onValidate}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 20,
  },
  textFieldView: {
    height: Constants.screenHeight * 0.06,
    width: Constants.screenWidth * 0.85,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    borderColor: Color.black,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Color.smoke,
  },
  errorText: {
    fontSize: 12,
    color: Color.red,
    marginBottom: -5,
    marginHorizontal: 20,
  },
});

export default EmailTextField;
