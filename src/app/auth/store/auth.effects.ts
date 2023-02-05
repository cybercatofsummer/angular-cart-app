import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { AuthResponseData, AuthService } from "../auth.service";
import { AUTO_LOGIN, LOGIN, Login, LoginFail, LoginStart, LOGIN_START, LOGOUT, SignupStart, SIGNUP_START } from "./auth.actions";
import { Router } from '@angular/router';
import { User } from '../user.model';

const handleAuth = (resData) => {
    const expirationDate = new Date(
        new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
        resData.email,
        resData.localId,
        resData.idToken,
        expirationDate
    );

    localStorage.setItem('userData', JSON.stringify(user));

    return new Login({
        email: resData.email,
        userId: resData.localId,
        token: resData.idToken,
        expirationDate: expirationDate
    });
};

const handleError = (errorRes) => {
    let errorMessage = 'Unknown Error Occurred';
    if (!errorRes?.error?.error) {
        return of(new LoginFail(errorMessage));
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
    return of(new LoginFail(errorMessage));
};

const makeRestRequest = (http: HttpClient, url: string, data) => {
    return http.post<AuthResponseData>(url,
        {
            email: data.payload.email,
            password: data.payload.password,
            returnSecureToken: true
        }
    )
}


@Injectable()
export class AuthEffects {

    private API_KEY = environment.firebaseApiKey;
    private AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    private LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;


    authSignup = createEffect(() => this.actions$.pipe(
        ofType(SIGNUP_START),
        switchMap((signupAction: SignupStart) => 
            makeRestRequest(this.http, this.AUTH_URL, signupAction)
            .pipe(
                tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                map(resData => handleAuth(resData)),
                catchError(errorRes => handleError(errorRes))
            )
        )
    ));

    autoLogin = createEffect(
        () => this.actions$.pipe(
            ofType(AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: Date;
                } = JSON.parse(localStorage.getItem('userData'));
        
                if (!userData) {
                    return {type: 'DUMMY'};
                }
        
                const localUser = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );
        
                if (localUser.token) {
                    const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(time);
                    return new Login({
                        email: localUser.email,
                        userId: localUser.id,
                        token: localUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate)
                    });
                }

                return {type: 'DUMMY'};
            })
        )
    )

    authLogin = createEffect(
        () => this.actions$.pipe(
            ofType(LOGIN_START),
            switchMap((authData: LoginStart) => 
                makeRestRequest(this.http, this.LOGIN_URL, authData)
                .pipe(
                    tap(resData => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
                    map(resData => handleAuth(resData)),
                    catchError(errorRes => handleError(errorRes))
                )
            )
        )
    );

    authLogout = createEffect(
        () => this.actions$.pipe(
            ofType(LOGOUT),
            tap(() => {
                localStorage.removeItem('userData');
                this.authService.clearTimer();
                this.router.navigate(['/auth']);
            })
        ),
        {dispatch: false}
    );

    authSuccess = createEffect(
        () => this.actions$.pipe(
            ofType(LOGIN),
            tap(() => this.router.navigate(['/']))
        ), { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

}