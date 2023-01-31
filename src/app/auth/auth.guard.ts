import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        rotuter: RouterStateSnapshot
    ): boolean | 
       UrlTree | 
       Observable<boolean | UrlTree> | 
       Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => !!authState.user || this.router.createUrlTree(['/auth']))
        );
    }
}