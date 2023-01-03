import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  constructor(private shoppingListService: ShoppingListService) {}

  @ViewChild('nameInput')
  nameInputRef: ElementRef

  @ViewChild('amountInput')
  amountInputRef: ElementRef

  onAdd() {
    this.shoppingListService.addIngregient(
      [{
        name: this.nameInputRef.nativeElement.value,
        amount: this.amountInputRef.nativeElement.value
      }]
    ); 
    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredients();
  }

  onClear() {
    this.nameInputRef.nativeElement.value = null;
    this.amountInputRef.nativeElement.value = null;
  }
}
