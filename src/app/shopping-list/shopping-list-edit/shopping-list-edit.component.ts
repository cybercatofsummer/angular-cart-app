import { Subscription } from 'rxjs';
import { Ingredient } from './../ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onAddItem() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngregient(
      [newIngredient]
    ); 
    this.slForm.reset();
  }

  onUpdateItem() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.updateIngredient(
      this.editedItemIndex ,newIngredient
    );
    this.onClear();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex)
    } else {
      this.shoppingListService.deleteIngredients()
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
