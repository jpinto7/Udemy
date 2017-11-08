import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Ingredient from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  private subscription: Subscription;
  private editMode = false;
  private editedItemIndex: number;
  private editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        amount: this.editedItem.amount,
        name: this.editedItem.name
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const {
      amount,
      name
    } = <{amount: number, name: string}>this.form.value;
    const ingredient = new Ingredient(name, amount);
    this.editMode ? this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient) : this.shoppingListService.addIngredient(ingredient);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
