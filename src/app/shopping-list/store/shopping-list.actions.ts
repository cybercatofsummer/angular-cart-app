import { Ingredient } from './../ingredient.model';
import { Action } from "@ngrx/store";

export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add ingredients';

export const UPDATE_INGREDIENT = '[Shopping List] Update ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete ingredient';
export const DELETE_INGREDIENTS = '[Shopping List] Delete ingredients';

export const START_EDIT = '[Shopping List] Start edit';
export const STOP_EDIT = '[Shopping List] Stop edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class DeleteIngredients implements Action {
    readonly type = DELETE_INGREDIENTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions = 
    AddIngredient |
    AddIngredients |
    UpdateIngredient |
    DeleteIngredient |
    DeleteIngredients |
    StartEdit |
    StopEdit