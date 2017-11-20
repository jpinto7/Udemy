import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import Ingredient from '../../shared/ingredient.model';
import { AddIngredient, UpdateIngredient, DeleteIngredient, StopEdit } from './../store/shopping-list.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  private subscription: Subscription;
  private editedItem: Ingredient = null;
  editMode = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe((data) => {
        if (data.editedIngredient.index !== null) {
          this.editedItem = data.editedIngredient.ingredient;
          this.editMode = true;
          this.form.setValue({
            amount: this.editedItem.amount,
            name: this.editedItem.name
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.store.dispatch(new StopEdit());
    }
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const {
      amount,
      name
    } = <{amount: number, name: string}>this.form.value;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editedItem = null;
    this.form.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }
}
