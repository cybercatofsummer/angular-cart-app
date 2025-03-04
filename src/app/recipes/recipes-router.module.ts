import { RouterModule } from '@angular/router';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGuard } from './../auth/auth.guard';
import { RecipesComponent } from './recipes.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', 
      component: RecipesComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ]},
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RecipesRouterModule {}