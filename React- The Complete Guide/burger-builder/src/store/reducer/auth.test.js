import reducer from './auth';
import * as actionsTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authPathRedirect: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authPathRedirect: '/',
        },
        {
          type: actionsTypes.AUTH_SUCCESS,
          payload: {
            token: 'some-token',
            userId: 'some-user',
          },
        },
      ),
    ).toEqual({
      token: 'some-token',
      userId: 'some-user',
      error: null,
      loading: false,
      authPathRedirect: '/',
    });
  });
});
