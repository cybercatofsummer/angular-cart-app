import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output()
  recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[]= [
    new Recipe(
      'test recipe1',
      'test description1',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'
    ),
    new Recipe(
      'test recipe2',
      'test description2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'
    )
  ];

  updateRecipe(recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }
}
