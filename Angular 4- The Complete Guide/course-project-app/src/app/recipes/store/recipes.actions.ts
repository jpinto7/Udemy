import { Action } from '@ngrx/store';
import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, SET_RECIPES, FETCH_RECIPES, STORE_RECIPES } from './recipes.constants';
import Recipe from '../recipe.model';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions = (
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  SetRecipes |
  FetchRecipes |
  StoreRecipes
);
