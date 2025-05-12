import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.page').then((m) => m.RegisterPage),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'paneles',
    children: [
      {
        path: 'activar',
        loadComponent: () =>
          import('./shared/link-up-qr/link-up-qr.page').then((m) => m.LinkUpQrPage),
      },
    ],
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./shared/history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./shared/account/account.page').then((m) => m.AccountPage),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
];
