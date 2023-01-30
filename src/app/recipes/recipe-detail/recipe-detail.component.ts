import { AddIngredients } from './../../shopping-list/store/shopping-list.actions';
import { AppState } from './../../shopping-list/store/shopping-lits.reducer';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
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
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get recipe(): Recipe {
    return this.recipeService.getRecipe(this.recipeId);
  }

  recipeId: number;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.recipeId = +params.id);
  }

  toShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes'], {relativeTo: this.route})
  }
}
