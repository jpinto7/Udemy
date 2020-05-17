const { createStore } = require('redux');

const initialState = {
  counter: 0
};

const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_COUNTER':
      return { counter: state.counter + payload };
    case 'INC_COUNTER':
      return { counter: state.counter + 1 };
    default:
      return state;
  }
};

const store = createStore(rootReducer, initialState);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', payload: 5 });
