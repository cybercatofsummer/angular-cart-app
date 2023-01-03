import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shopping-list/ingredient.model';
import { Recipe } from './recipe.model';


export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe(
          'test recipe1',
          'test description1',
          'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Apple', 10)
        ]
        ),
        new Recipe(
          'test recipe2',
          'test description2',
          'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
          [
            new Ingredient('Chicken', 3),
            new Ingredient('Pineapple', 7)
          ]
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
  }
}