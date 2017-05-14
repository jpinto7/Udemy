import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authenticated from './authentication';

const rootReducer = combineReducers({
  routing,
  authenticated,
});

export default rootReducer;
