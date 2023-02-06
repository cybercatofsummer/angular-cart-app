import { DeleteRecipe } from './../store/recipe.actions';
import { switchMap, map } from 'rxjs';
import { AppState } from './../../store/app.reducer';
import { AddIngredients } from './../../shopping-list/store/shopping-list.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  recipe: Recipe;
  recipeId: number;

  ngOnInit() {
    this.route.params.pipe(
      map(params => +params.id),
      switchMap(id => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => index === this.recipeId)
      }))
      .subscribe(recipe => {
        this.recipe = recipe; 
      });
  }

  toShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes'], {relativeTo: this.route})
  }
}
