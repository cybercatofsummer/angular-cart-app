import { Ingredient } from './../shopping-list/ingredient.model';
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public id: number;

    constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[] = [],) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}