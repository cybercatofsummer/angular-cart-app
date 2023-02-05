import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { LoginStart, SignupStart } from './store/auth.actions';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string;

    @ViewChild(PlaceholderDirective, { static: false })
    alertHost: PlaceholderDirective;

    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;

            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy(): void {
        this.closeSub?.unsubscribe();
        this.storeSub?.unsubscribe();
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this.isLoading = true;

        const userData = {
            email: form.value.email,
            password: form.value.password
        };

        this.store.dispatch(this.isLoginMode ? new LoginStart(userData) : new SignupStart(userData));
        form.reset();
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