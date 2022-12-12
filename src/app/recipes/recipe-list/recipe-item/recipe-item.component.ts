import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Output()
  recipeData = new EventEmitter<void>();

  @Input()
  recipe: Recipe;

  onRecipeClicked() {
    this.recipeData.emit();
  }
}
