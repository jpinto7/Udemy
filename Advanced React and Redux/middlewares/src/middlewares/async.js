import {
  SUCCESS,
  FAILED,
} from '../constants';

const returnData = (response) => response.data;

const dispatchData = (dispatch, type) => data => {
  dispatch({
    type: `${type}_${SUCCESS}`,
    payload: data,
  });
};

const dispatchError = (dispatch, type) => error => {
  dispatch({
    type: `${type}_${FAILED}`,
    payload: error.message || 'An error ocurred processing the request',
  });
};

const asyncMiddleWare = ({ dispatch }) => (
  next => action => {
    if (!action.payload || !action.payload.then || typeof action.payload.then !== 'function') {
      return next(action);
    }
    const { payload: promise, type } = action;
    dispatch({ type });
    promise
      .then(returnData)
      .then(dispatchData(dispatch, type))
      .catch(dispatchError(dispatch, type));
  }
);

export default asyncMiddleWare;
