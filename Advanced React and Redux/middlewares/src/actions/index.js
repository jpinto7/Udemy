import axios from 'axios';

import {
  FETCH_USERS,
} from '../constants';

export const fetchUsers = () => {
  const promise = axios.get('https://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_USERS,
    payload: promise,
  };
};
