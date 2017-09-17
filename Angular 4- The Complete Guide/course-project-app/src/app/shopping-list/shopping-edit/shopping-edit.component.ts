import { Component, ElementRef, ViewChild } from '@angular/core';
import Ingredient from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem() {
    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(ingredient);
  }
}
