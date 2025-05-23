import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
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
    canActivate: [AuthGuard], 
  },
  {
    path: 'paneles',
    children: [
      {
        path: 'activar',
        loadComponent: () =>
          import('./shared/link-up-qr/link-up-qr.page').then(
            (m) => m.LinkUpQrPage
          ),
          canActivate: [AuthGuard], 
      },
    ],
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./shared/history/history.page').then((m) => m.HistoryPage),
    canActivate: [AuthGuard], 
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./shared/account/account.page').then((m) => m.AccountPage),
    canActivate: [AuthGuard], 
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
