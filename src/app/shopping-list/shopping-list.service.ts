import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngregient(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredients() {
        this.ingredients = [];
        this.ingredientsChanged.next(this.getIngredients());
    }
}