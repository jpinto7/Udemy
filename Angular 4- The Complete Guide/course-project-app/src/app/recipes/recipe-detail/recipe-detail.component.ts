import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import Recipe from '../recipe.model';
import { AddIngredients } from './../../shopping-list/store/shopping-list.actions';
import { FeatureState, State } from '../store/recipes.reducers';
import { DeleteRecipe } from './../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipeState: Observable<State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipesState: State) => {
        this.store.dispatch(new AddIngredients(recipesState.recipes[this.id].ingredients));
      });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
