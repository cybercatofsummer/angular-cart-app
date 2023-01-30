import { AddIngredient, DeleteIngredients, DeleteIngredient, UpdateIngredient, StopEdit } from './../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from './../ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../store/shopping-lits.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false })
  slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = state.editedIngredient;

        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new StopEdit());
  }

  onAddItem() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.store.dispatch(new AddIngredient(newIngredient))
    this.slForm.reset();
  }

  onUpdateItem() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    
    this.store.dispatch(new UpdateIngredient(newIngredient));
    this.onClear();
  }

  onDelete() {
    if (this.editMode) {
      this.store.dispatch(new DeleteIngredient())
    } else {
      this.store.dispatch(new DeleteIngredients())
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new StopEdit());
  }
}
