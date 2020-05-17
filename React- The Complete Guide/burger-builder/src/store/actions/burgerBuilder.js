import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: ingredient,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: ingredients,
});

export const initIngredients = () => dispatch => {
  axios
    .get('/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(() => {
      dispatch(fetchIngredientsFailed());
    });
};
