import { Subscription, map } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/store/auth.actions';

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
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(
            map(authState => authState.user)
        ).subscribe(user => {
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
        this.store.dispatch(new Logout());
    }
}