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

const API_URL = 'https://us-central1-one-time-password-f4485.cloudfunctions.net';

const styles = StyleSheet.create({
   container: {
     marginBottom: 10
   }
 });

const initialState = {
  phone: ''
};

class SignUpForm extends Component {
  state = initialState

  handleOnChangeText = (phone) => {
    this.setState({ phone });
  }

  handleSubmit = async () => {
    const { phone } = this.state;
    try {
      await axios.post(`${API_URL}/createUser`, {
        phone
      });
      await axios.post(`${API_URL}/requestOneTimePassword`, {
        phone
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { phone } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            onChangeText={this.handleOnChangeText}
            value={phone}
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

export default SignUpForm;
