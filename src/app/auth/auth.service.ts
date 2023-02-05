import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from './store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    token: string = null;

    private tokenExpirationTimer: any;

    constructor(private store: Store<AppState>) {}

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.store.dispatch(new Logout()), expirationDuration);
    }

    clearTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}