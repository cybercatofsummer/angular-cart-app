import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuth = false;

    constructor(
        private dataStorage: DataStorageService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            console.log('debug => ', user);
            
            this.isAuth = !!user
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.dataStorage.storeRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}