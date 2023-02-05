import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { FetchRecipes, SET_RECIPES } from './store/recipe.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AppState } from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => recipeState.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new FetchRecipes());
                    return this.actions$.pipe(
                        ofType(SET_RECIPES),
                        take(1)
                    );
                }
                return of(recipes);
            })
        );
    }
}