import { combineEpics } from 'redux-observable';
import signInUser from './signInUser';

const rootEpic = combineEpics(
  signInUser,
);

export default rootEpic;
