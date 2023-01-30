import { StartEdit } from './store/shopping-list.actions';
import { Ingredient } from './ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/shopping-lits.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {}

  onEdititem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
