import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { StartEdit } from './store/shopping-list.actions';

import Ingredient from '../shared/ingredient.model';
import { AppState } from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngredient(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
