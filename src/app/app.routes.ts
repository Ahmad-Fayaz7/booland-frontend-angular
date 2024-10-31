import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { SignUpComponent } from './features/user-auth/components/sign-up/sign-up.component';
import { LoginComponent } from './features/user-auth/components/login/login.component';
import { AuthGuard } from './features/user-auth/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
