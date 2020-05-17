import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

export function* initIngredients() {
  try {
    const response = yield axios.get( 'https://react-my-burger.firebaseio.com/ingredients.json' )
    yield put(actions.setIngredients(response.data));
  } catch(error) {
    yield put(actions.fetchIngredientsFailed());
  }
};
