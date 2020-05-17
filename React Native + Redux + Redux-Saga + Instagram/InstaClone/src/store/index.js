import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const testReducer = (state = [], action) => state;

const rootReducer = combineReducers({
  testReducer,
  form,
});

const store = createStore(rootReducer);

export default store;
