import { DELETE_INGREDIENT } from './../../shopping-list/store/shopping-list.actions';
import { RecipesActions, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipe.actions';
import { Recipe } from './../recipe.model';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action: RecipesActions) {
    switch (action.type) {
        case SET_RECIPES: 
            return {
                ...state,
                recipes: [...action.payload]
            }
        case ADD_RECIPE: 
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case UPDATE_RECIPE: 
            const newRecipes = [...state.recipes];
            newRecipes[action.payload.index] = {...action.payload.recipe};

            return {
                ...state,
                recipes: newRecipes
            }
        case DELETE_RECIPE: 
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            }
        default:
            return state;

    }
}