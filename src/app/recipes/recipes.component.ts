import { RecipeService } from './recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy(): void {
      
  }
}
