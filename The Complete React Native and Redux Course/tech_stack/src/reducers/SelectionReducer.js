const initialState = null;

function selectionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_LIBRARY':
      return action.id;
    default:
      return state;
  }
}

export default selectionReducer;
