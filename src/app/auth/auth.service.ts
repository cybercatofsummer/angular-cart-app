import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Login, Logout } from './store/auth.actions';

interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

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

    //user = new BehaviorSubject<User>(null);
    token: string = null;

    private tokenExpirationTime: any;

    private API_KEY = environment.firebaseApiKey;
    private AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    private LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<AppState>,
    ) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            this.AUTH_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resdata => this.handleAuth(resdata)),
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.LOGIN_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resdata => this.handleAuth(resdata)),
        );
    }

    logout() {
        //this.user.next(null);
        this.store.dispatch(new Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
        }
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: Date;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const localUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (localUser.token) {
            //this.user.next(localUser);
            this.store.dispatch(new Login({
                email: localUser.email,
                userId: localUser.id,
                token: localUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));
            const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(time);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => this.logout(), expirationDuration);
    }

    private handleAuth(resdata) {
        //get milliseconds
        const expirationDate = new Date(new Date().getTime() + resdata.expiresIn * 1000);
        const user = new User(resdata.email, resdata.localId, resdata.idToken, expirationDate);
        //this.user.next(user); 

        this.store.dispatch(new Login({
            email: user.email,
            userId: user.id,
            token: user.token,
            expirationDate: expirationDate
        }));

        this.autoLogout(resdata.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Unknown Error Occurred';
        if (!errorRes?.error?.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists.';
                break;
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'This emails does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is wrong.';
                break;
        }

        return throwError(errorMessage);
    }
}