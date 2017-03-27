import data from './LibraryList.json';

const initialState = data;

function libraryReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default libraryReducer;
