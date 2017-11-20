import { AppState } from './../../store/app.reducers';
import { SET_RECIPES, ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from './recipes.constants';
import { RecipesActions } from './recipes.actions';
import Recipe from '../recipe.model';
import Ingredient from '../../shared/ingredient.model';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'A test recipe',
      'Simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Lettuce', 5),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Another test recipe',
      'Simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ]
};

export function recipesReducer(state = initialState, action: RecipesActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE: {
      const recipes = [...state.recipes];
      recipes[action.payload.index] = action.payload.recipe;
      return {
        ...state,
        recipes
      };
    }
    case DELETE_RECIPE: {
      const recipes = [...state.recipes];
      recipes.splice(action.payload, 1);
      return {
        ...state,
        recipes
      };
    }
    default:
      return state;
  }
}
