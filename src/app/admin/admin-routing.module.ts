import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin/admin.component';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'settings',
        component: AdminComponent,
      },
      {
        path: 'settings/countries',
        component: AdminComponent,
      },
      {
        path: 'settings/vats',
        component: AdminComponent,
      },
      {
        path: 'users',
        component: AdminComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AdminRoutingModule {
}
