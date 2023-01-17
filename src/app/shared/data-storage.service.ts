import { Subject, map, tap } from 'rxjs';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    private BASE_URL = 'https://angular-learning-effcb-default-rtdb.europe-west1.firebasedatabase.app/';
    private RECIPES_URL = this.BASE_URL + '/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put(this.RECIPES_URL, recipes)
        .subscribe(response => {
            console.log(response);
            
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.RECIPES_URL)
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients || []}
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )
    }
}