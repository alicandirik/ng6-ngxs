import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthenticationGuard} from './auth/guards/authentication.guard';
import {AuthorizationGuard} from './auth/guards/authorization.guard';

const APP_ROUTES: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthenticationGuard, AuthorizationGuard],
    data: { roles: ['sys-admin'] }
  },
  { path: 'invoicing',
    loadChildren: './invoicing/invoicing.module#InvoicingModule',
    canLoad: [AuthenticationGuard, AuthorizationGuard],
    data: { roles: ['sales-user'] }
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { paramsInheritanceStrategy: 'always' }) // , enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
