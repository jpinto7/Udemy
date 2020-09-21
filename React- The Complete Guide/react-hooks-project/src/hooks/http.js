import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
};

const httpReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: payload
      };
    case 'RESPONSE':
      return {
        ...state,
        loading: false,
        data: payload.data,
        extra: payload.extra
      };
    case 'ERROR':
      return {
        loading: false,
        error: payload
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback((url, method, body, reqExtra, identifier) => {
    dispatchHttp({ type: 'SEND', payload: identifier });
    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatchHttp({
        type: 'RESPONSE',
        payload: {
          data,
          extra: reqExtra
        }
      });
    })
    .catch(error => {
      dispatchHttp({ type: 'ERROR', payload: 'Something went wrong!' });
    });
  }, []);

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    extra: httpState.extra,
    identifier: httpState.identifier,
    sendRequest,
    clear
  };
};

export default useHttp;
