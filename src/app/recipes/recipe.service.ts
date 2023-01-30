import { AddIngredients } from './../shopping-list/store/shopping-list.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shopping-list/ingredient.model';
import { Recipe } from './recipe.model';
import { AppState } from '../shopping-list/store/shopping-lits.reducer';

@Injectable({providedIn: 'root'})
export class RecipeService {

  recipeChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private store: Store<AppState>) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this is something I missed during angular course ??

    this.store.dispatch(new AddIngredients(ingredients));
  }
}