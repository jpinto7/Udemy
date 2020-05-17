const actions = {
  incrementCounter: () => ({
    type: 'INCREMENT_COUNTER'
  }),
  decrementCounter: () => ({
    type: 'DECREMENT_COUNTER'
  }),
  addCounter: value => ({
    type: 'ADD_COUNTER',
    payload: value
  }),
  substractCounter: value => ({
    type: 'SUBSTRACT_COUNTER',
    payload: value
  }),  
};

export default actions;
