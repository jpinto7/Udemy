import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  FormInput,
  FormLabel
} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const API_URL = 'https://us-central1-one-time-password-f4485.cloudfunctions.net';

const styles = StyleSheet.create({
   container: {
     marginBottom: 10
   }
 });

const initialState = {
  code: '',
  phone: ''
};

class SignInForm extends Component {
  state = initialState

  handleOnChangeText = (input) => (value) => {
    this.setState({ [input]: value });
  }

  handleSubmit = async () => {
    const {
      code,
      phone
    } = this.state;
    try {
      const { data: { token = '' } = {} } = await axios.post(`${API_URL}/verifyOneTimePassword`, {
        code,
        phone
      });
      firebase.auth().signInWithCustomToken(token);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      code,
      phone
    } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            onChangeText={this.handleOnChangeText('phone')}
            value={phone}
          />
        </View>
        <View style={styles.container}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            onChangeText={this.handleOnChangeText('code')}
            value={code}
          />
        </View>
        <Button
          onPress={this.handleSubmit}
          title="Submit"
        />
      </View>
    )
  }
}

export default SignInForm;
