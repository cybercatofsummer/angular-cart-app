import { AddIngredient, DeleteIngredients, DeleteIngredient, UpdateIngredient, StopEdit } from './../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from './../ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducer';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(state => {
      this.editMode = state.editedIngredientIndex > -1;

      if (this.editMode) {
        this.editedItem = state.editedIngredient;
        this.slForm.setValue(new Ingredient(this.editedItem.name, this.editedItem.amount));
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new StopEdit());
  }

  get newIngredient() {
    const value = this.slForm.value;
    return new Ingredient(value.name, value.amount); 
  }

  onAddItem() {
    this.store.dispatch(new AddIngredient(this.newIngredient));
    this.slForm.reset();
  }

  onUpdateItem() {
    this.store.dispatch(new UpdateIngredient(this.newIngredient));
    this.onClear();
  }

  onDelete() {
    this.store.dispatch(this.editMode ? new DeleteIngredient() : new DeleteIngredients());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new StopEdit());
  }
}
