import { Subject } from 'rxjs';
import { Ingredient } from '../shopping-list/ingredient.model';
import { Recipe } from './recipe.model';


export class RecipeService {

  recipeChanges = new Subject<Recipe[]>()

    // private recipes: Recipe[]= [
    //     new Recipe(
    //       'test recipe1',
    //       'test description1',
    //       'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('Apple', 10)
    //     ]
    //     ),
    //     new Recipe(
    //       'test recipe2',
    //       'test description2',
    //       'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
    //       [
    //         new Ingredient('Chicken', 3),
    //         new Ingredient('Pineapple', 7)
    //       ]
    //     )
    // ];

  private recipes: Recipe[] = [];

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
}