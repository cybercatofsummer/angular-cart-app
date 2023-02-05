import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './../recipe.model';
import { switchMap, map, withLatestFrom } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

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

    storeRecipes = createEffect(() => this.actions$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(this.RECIPES_URL, recipesState.recipes)
        })
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) {}
}