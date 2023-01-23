import { AuthService } from './auth.service';
import { Observable, take, exhaustMap } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
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