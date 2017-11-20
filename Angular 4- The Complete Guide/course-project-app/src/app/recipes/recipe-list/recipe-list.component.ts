import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import Recipe from '../recipe.model';
import { FeatureState, State } from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<State>;

  constructor(private store: Store<FeatureState>) {}

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
}
