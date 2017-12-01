import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FB_LOGIN_FAIL,
  FB_LOGIN_SUCCESS
} from './types';

export const fbLoginSuccess = () => (
  async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      dispatch({
        type: FB_LOGIN_SUCCESS,
        payload: token
      });
    } else {
      doFacebookLogin(dispatch);
    }
  }
);

const doFacebookLogin = async dispatch => {
  let {
    token,
    type
  } = await Facebook.logInWithReadPermissionsAsync('172278276692005', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    dispatch({ type: FB_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({
    type: FB_LOGIN_SUCCESS,
    payload: token
  });
}
