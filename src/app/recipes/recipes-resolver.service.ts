import { Actions, ofType } from '@ngrx/effects';
import { FetchRecipes, SET_RECIPES } from './store/recipe.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AppState } from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        this.store.dispatch(new FetchRecipes());
        return this.actions$.pipe(
            ofType(SET_RECIPES),
            take(1)
        );
    }
}