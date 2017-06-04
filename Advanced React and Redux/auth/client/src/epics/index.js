import { combineEpics } from 'redux-observable';
import authEpics from './auth';
import featureEpics from './feature';

const rootEpic = combineEpics(
  authEpics,
  featureEpics,
);

export default rootEpic;
