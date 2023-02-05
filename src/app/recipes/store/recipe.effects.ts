import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './../recipe.model';
import { switchMap, map } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { FETCH_RECIPES, SetRecipes } from './recipe.actions';

@Injectable()
export class RecipeEffects {

    private BASE_URL = 'https://angular-learning-effcb-default-rtdb.europe-west1.firebasedatabase.app/';
    private RECIPES_URL = this.BASE_URL + '/recipes.json';

    fetchRecipes = createEffect(() => this.actions$.pipe(
        ofType(FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(this.RECIPES_URL);
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients || []}
            })
        }),
        map(recipes => new SetRecipes(recipes))
    ));

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}
}