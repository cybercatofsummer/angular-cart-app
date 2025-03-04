import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}
  
  ngOnInit() {
    this.subscription = this.store.select('recipes').pipe(
      map(recipesState => recipesState.recipes)
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
