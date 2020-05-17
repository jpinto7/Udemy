import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const addIngredient = (state, payload) => {
  const updatedIngredient = { [payload]: state.ingredients[payload] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, payload) => {
  if (state.ingredients[payload] <= 0) {
    return state;
  }
  const updatedIngredient = { [payload]: state.ingredients[payload] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload],
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, payload) =>
  updateObject(state, {
    error: false,
    totalPrice: 4,
    ingredients: payload,
    building: false,
  });

const fetchIngredientsFailed = state => updateObject(state, { error: true });

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, payload);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, payload);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, payload);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
