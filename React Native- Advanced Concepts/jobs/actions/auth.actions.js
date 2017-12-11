import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import * as types from './types';

export const facebookLogin = () => (
  async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      dispatch({
        type: types.FB_LOGIN_SUCCESS,
        payload: token
      });
    } else {
      doFacebookLogin(dispatch);
    }
  }
);

const doFacebookLogin = async dispatch => {
  const {
    token,
    type
  } = await Facebook.logInWithReadPermissionsAsync('172278276692005', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: types.FB_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({
    type: types.FB_LOGIN_SUCCESS,
    payload: token
  });
};
