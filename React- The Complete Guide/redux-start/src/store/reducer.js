const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'INCREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'DECREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter - 1
      };
    case 'ADD_COUNTER':
      return {
        ...state,
        counter: state.counter + payload
      };
    case 'SUBSTRACT_COUNTER':
      return {
        ...state,
        counter: state.counter - payload
      };
    default:
      return state;
  }
};

export default reducer;
