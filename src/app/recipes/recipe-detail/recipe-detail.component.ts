import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  get recipe(): Recipe {
    return this.recipeService.getRecipe(this.recipeId);
  }

  recipeId: number;

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.recipeId = +params.id;
      }
    )
  }

  toShoppingList() {
    this.shoppingListService.addIngregient(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
