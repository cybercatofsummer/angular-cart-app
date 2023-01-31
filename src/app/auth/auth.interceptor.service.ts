import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Observable, take, exhaustMap, map } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppState } from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                
                const modifReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifReq);
            }),
        );
    }
}