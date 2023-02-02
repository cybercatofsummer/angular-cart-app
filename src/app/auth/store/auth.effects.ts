import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { AuthResponseData } from "../auth.service";
import { LOGIN, Login, LoginFail, LoginStart, LOGIN_START } from "./auth.actions";
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    private API_KEY = environment.firebaseApiKey;
    private AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    private LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
    
    authLogin = createEffect(
        () => this.actions$.pipe(
            ofType(LOGIN_START),
            switchMap((authData: LoginStart) => {
                return this.http.post<AuthResponseData>(this.LOGIN_URL,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                .pipe(
                    map(resData => {
                        const expirationDate = new Date(
                            new Date().getTime() + +resData.expiresIn * 1000
                        );
                        return new Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        });
                    }),
                    catchError(errorRes => {
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
                    })
                );
            })
        )
    );

    authSuccess = createEffect(
        () => this.actions$.pipe(
            ofType(LOGIN),
            tap(() => this.router.navigate(['/']))
        ), {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}


}