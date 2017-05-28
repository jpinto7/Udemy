import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  routing,
  form,
});

export default rootReducer;
