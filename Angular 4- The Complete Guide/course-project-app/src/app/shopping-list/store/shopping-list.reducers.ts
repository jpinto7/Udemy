import { Action } from '@ngrx/store';
import Ingredient from '../../shared/ingredient.model';
import { ShoppingListActions } from './shopping-list.actions';
import { ADD_INGREDIENT, ADD_INGREDIENTS, UPDATE_INGREDIENT, DELETE_INGREDIENT, START_EDIT, STOP_EDIT } from './shopping-list.constants';

export interface State {
  editedIngredient: {
    index: number,
    ingredient: Ingredient
  };
  ingredients: Ingredient[];
}

const initialState: State = {
  editedIngredient: {
    index: null,
    ingredient: null
  },
  ingredients: [
    new Ingredient('Lettuce', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case UPDATE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredient.index] = action.payload;
      return {
        ...state,
        editedIngredient: initialState.editedIngredient,
        ingredients
      };
    }
    case DELETE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredient.index, 1);
      return {
        ...state,
        editedIngredient: initialState.editedIngredient,
        ingredients
      };
    }
    case START_EDIT: {
      return {
        ...state,
        editedIngredient: {
          index: action.payload,
          ingredient: {...state.ingredients[action.payload]}
        }
      };
    }
    case STOP_EDIT: {
      return {
        ...state,
        editedIngredient: initialState.editedIngredient
      };
    }
    default:
      return state;
  }
}
