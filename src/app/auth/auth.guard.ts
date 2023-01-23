import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        rotuter: RouterStateSnapshot
    ): boolean | 
       UrlTree | 
       Observable<boolean | UrlTree> | 
       Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => !!user || this.router.createUrlTree(['/auth']))
        );
    }
}