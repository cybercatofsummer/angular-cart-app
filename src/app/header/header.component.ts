import { FetchRecipes, StoreRecipes } from './../recipes/store/recipe.actions';
import { Subscription, map } from 'rxjs';
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

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(
            map(authState => authState.user)
        ).subscribe(user => {
            this.isAuth = !!user
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.store.dispatch(new StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}