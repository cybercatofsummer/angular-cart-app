import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
      
  }
}
