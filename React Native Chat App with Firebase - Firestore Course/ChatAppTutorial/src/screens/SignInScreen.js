import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../components/Button';
import EmailTextField from '../components/EmailTextField';
import PasswordTextField from '../components/PasswordTextField';
import DismissKeyboard from '../components/DismissKeyboard';
import Strings from '../const/Strings';
import Images from '../const/Images';
import Constants from '../const/Constants';
import Color from '../utils/Colors';
import Utility from '../utils/Utility';
import firebase from '../firebase';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmailAddress = () => {
    const isValidEmail = Utility.isEmailValid(email);
    isValidEmail
      ? setEmailError('')
      : setEmailError(Strings.InvalidEmailAddress);
    return isValidEmail;
  };

  const validatePassword = () => {
    const isValidPassword = Utility.isValidField(password);
    isValidPassword
      ? setPasswordError('')
      : setPasswordError(Strings.InvalidPassword);
    return isValidPassword;
  };

  const registration = (email, password) => {};

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <SafeAreaView>
            <Image style={styles.logo} source={Images.logo} />
            <EmailTextField
              term={email}
              error={emailError}
              placeholder={Strings.EmailPlaceHolder}
              onChange={setEmail}
              onValidate={validateEmailAddress}
            />
            <PasswordTextField
              term={password}
              error={passwordError}
              placeholder={Strings.PasswordPlaceHolder}
              onChange={setPassword}
              onValidate={validatePassword}
            />
            <Button title={Strings.Join} />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    margin: 0.04 * Constants.screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.theme,
  },
});

export default SignInScreen;
