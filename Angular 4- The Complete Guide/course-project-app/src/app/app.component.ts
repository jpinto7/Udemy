import { Component } from '@angular/core';
import ShoppingListService from './shopping-list/shopping-list.service';
import RecipeService from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    RecipeService,
    ShoppingListService
  ]
})
export class AppComponent {
  loadedFeature = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
