import { Routes } from '@angular/router';
import { AuthLayout } from './components/auth-layout/auth-layout';
import { SignUp } from './components/sign-up/sign-up';
import { LogIn } from './components/log-in/log-in';
import { ForgrtPassword } from './components/forgrt-password/forgrt-password';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'sign-up',
        component: SignUp,
      },
      {
        path: 'log-in',
        component: LogIn,
      },
       {
        path: 'forget',
        component: ForgrtPassword,
      },
      {
        path: '',
        redirectTo: 'sign-up',
        pathMatch: 'full',
      },
    ],
  },
];