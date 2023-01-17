import { DataStorageService } from './../shared/data-storage.service';
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent {

    constructor(private dataStorage: DataStorageService) {}

    onSaveData() {
        this.dataStorage.storeRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }
}