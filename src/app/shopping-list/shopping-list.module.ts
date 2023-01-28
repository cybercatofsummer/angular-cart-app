import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [ 
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]), 
        SharedModule,
    ]
})
export class ShoppingListModule {}