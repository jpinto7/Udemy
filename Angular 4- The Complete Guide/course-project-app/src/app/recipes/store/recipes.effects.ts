import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FETCH_RECIPES, STORE_RECIPES } from './recipes.constants';
import { SetRecipes, FetchRecipes, StoreRecipes } from './recipes.actions';
import Recipe from '../../recipes/recipe.model';
import { FeatureState } from './recipes.reducers';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$
    .ofType(FETCH_RECIPES)
    .switchMap(() => (
      this.httpClient.get<Recipe[]>('https://ng-recipe-book-7af53.firebaseio.com/recipes.json')
    ))
    .map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe.ingredients) {
          recipe.ingredients = [];
        }
      }
      return new SetRecipes(recipes);
    });

  @Effect({ dispatch: false })
  storeRecipes = this.actions$
    .ofType(STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-7af53.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true
      });
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<FeatureState>) {}
}
