import { EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngregient(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    deleteIngredients() {
        this.ingredients = [];
        this.ingredientsChanged.emit(this.getIngredients());
    }
}