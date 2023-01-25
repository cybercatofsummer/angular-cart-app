import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    //{ path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    //{ path: '**', redirectTo: '/not-found' } // must be last
  ];

@NgModule({
    imports:[ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}