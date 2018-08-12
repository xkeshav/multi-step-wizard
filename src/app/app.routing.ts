import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'init', pathMatch: 'full' },
      {
        path: 'init',
        loadChildren: './registration/registration.module#RegistrationModule'
      }
    ]
  },
  { path: '**', redirectTo: 'authentication' }
];
