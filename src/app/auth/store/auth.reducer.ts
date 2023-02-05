import { User } from "../user.model";
import { AuthActions, CLEAR_ERROR, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT, SIGNUP_START } from "./auth.actions";


export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return { ...state, user: user, loading: false };
        case LOGOUT:
            return { ...state, user: null, loading: false };
        case LOGIN_START:
            return { ...state, loading: true, authError: null };
        case CLEAR_ERROR:
            return { ...state, authError: null };
        case LOGIN_FAIL:
            return { 
                ...state, 
                user: null, 
                authError: action.payload,
                loading: false
            };
        case SIGNUP_START:
            return { ...state, authError: null };
        default: 
            return state;
    }
}