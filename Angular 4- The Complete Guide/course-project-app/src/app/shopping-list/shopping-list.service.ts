import Ingredient from '../shared/ingredient.model';

export default class ShoppingListService {
  private ingredients: Ingredient[] = [];

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
