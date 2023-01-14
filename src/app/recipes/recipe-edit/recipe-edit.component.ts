import { Recipe } from './../recipe.model';
import { Ingredient } from './../../shopping-list/ingredient.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = Boolean(params.id);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(this.createNewIngredient(ingredient));
        });
        //recipeIngredients.push(...newRecpes);
      }
    }
    

    this.recipeForm = new FormGroup({
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
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.ingredients,
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
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
