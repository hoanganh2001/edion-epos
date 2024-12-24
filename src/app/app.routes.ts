// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { Error404Component } from './pages/error/error-404/error-404.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      //   { path: 'login', component: LoginComponent },
      //   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

      {
        path: '404',
        loadComponent: () =>
          import('./pages/error/error-404/error-404.component').then(
            (c) => c.Error404Component
          ),
      },
    ],
  },
  {
    path: 'products',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/modules/product/product.module').then(
        (m) => m.ProductModule
      ),
  },
  {
    path: 'payment',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/modules/payment/payment.module').then(
        (m) => m.PaymentModule
      ),
  },
  {
    path: 'sales',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/modules/sales/sales.module').then((m) => m.SalesModule),
  },
  {
    path: '500',
    loadComponent: () =>
      import('./pages/error/error-500/error-500.component').then(
        (c) => c.Error500Component
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/error/error-404/error-404.component').then(
        (c) => c.Error404Component
      ),
  },
];
