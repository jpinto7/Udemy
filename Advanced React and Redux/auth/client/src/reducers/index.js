import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  form,
  routing,
});

export default rootReducer;
