import { combineEpics } from 'redux-observable';
import signInUser from './signInUser';
import signOutUser from './signOutUser';

const rootEpic = combineEpics(
  signInUser,
  signOutUser,
);

export default rootEpic;
