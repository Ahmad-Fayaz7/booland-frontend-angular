import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { SignUpComponent } from './features/user-auth/components/sign-up/sign-up.component';
import { LoginComponent } from './features/user-auth/components/login/login.component';
import { AuthGuard } from './features/user-auth/services/auth-guard.service';
import { DetailsPageComponent } from './features/book-features/components/details-page/details-page.component';
import { CartComponent } from './features/shopping-cart/components/cart/cart.component';
import { CheckoutFormComponent } from './features/checkout/checkout-form/checkout-form.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'books/:id',
    component: DetailsPageComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutFormComponent,
  },
];
