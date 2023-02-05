import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN START';
export const LOGIN_FAIL = '[Auth] LOGIN FAIL';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] CLEAR ERROR';
export const AUTO_LOGIN = '[Auth] AUTO LOGIN';
export const SIGNUP_START = '[Auth] SIGNUP START';
export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {
            email: string;
            userId: string;
            token: string;
            expirationDate: Date;
            redirect: boolean;
        }
    ) {}

}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email: string; password: string}) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string; password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = 
    Login |
    Logout |
    LoginStart |
    LoginFail | 
    SignupStart | 
    ClearError | 
    AutoLogin;