import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, OnDestroy } from '@angular/core';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string;

    @ViewChild(PlaceholderDirective, { static: false })
    alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.login(form.value.email, form.value.password);
        } else {
            authObs = this.authService.signup(form.value.email, form.value.password);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error => {
                console.log(error);
                this.error = error;
                this.showErrorAlert(error);
                this.isLoading = false;
            }
        )

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(errorMessage: string) {
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const cpmRef = hostViewContainerRef.createComponent(AlertComponent)

        cpmRef.instance.message = errorMessage;

        this.closeSub = cpmRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }
}