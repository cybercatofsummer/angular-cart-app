import { Ingredient } from '../ingredient.model';
import { 
    ADD_INGREDIENT, 
    ADD_INGREDIENTS, 
    ShoppingListActions, 
    UPDATE_INGREDIENT, 
    DELETE_INGREDIENTS, 
    DELETE_INGREDIENT,
    STOP_EDIT,
    START_EDIT
} from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => index !== state.editedIngredientIndex),
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case DELETE_INGREDIENTS:
            return {
                ...state,
                ingredients: []
            };
        case START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
            
        default: 
            return state;
    }
}
