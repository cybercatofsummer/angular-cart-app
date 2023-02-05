import { OnDestroy } from '@angular/core';
import { AddRecipe, UpdateRecipe } from './../store/recipe.actions';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from './../recipe.model';
import { Ingredient } from './../../shopping-list/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = Boolean(params.id);
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }

  private initForm() {
    this.storeSub = this.store
      .select('recipes')
      .pipe(map(recipeState => recipeState.recipes.find(
          (recipe, index) => index === this.id
      )))
      .subscribe(recipe => {
        this.recipeForm = this.getRecipeForm(recipe);
      });
  }

  getRecipeForm(recipe: Recipe): FormGroup {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(this.createNewIngredient(ingredient));
        });
      }
    }

    return new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  createNewIngredient(ingredient: Ingredient) {
    return new FormGroup({
      'name': new FormControl(ingredient.name, Validators.required),
      'amount': new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  }

  onSubmit() {
    this.store.dispatch(this.editMode 
      ? new UpdateRecipe({index: this.id, recipe: this.recipeForm.value}) 
      : new AddRecipe(this.recipeForm.value)
    );

     this.onCancel();
  }

  get ingredientsArr() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  onAddIngredient() {
    this.ingredientsArr.push(this.createNewIngredient(new Ingredient(null, null)));
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onDeleteIngredient(index: number) {
    this.ingredientsArr.removeAt(index);
  }

}
