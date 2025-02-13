import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { SignUpComponent } from './features/user-auth/components/sign-up/sign-up.component';
import { LoginComponent } from './features/user-auth/components/login/login.component';
import { AuthGuard } from './features/user-auth/services/auth-guard.service';
import { DetailsPageComponent } from './features/book-features/components/details-page/details-page.component';
import { CartComponent } from './features/shopping-cart/components/cart/cart.component';
import { CheckoutFormComponent } from './features/checkout/checkout-form/checkout-form.component';
import { BooksByCategoryComponent } from './features/book-features/components/books-by-category/books-by-category.component';
import { BooksTableComponent } from './features/book-features/components/books-table/books-table.component';
import { ListComponent } from './core/components/list/list.component';
import { Component } from '@angular/core';
import { BookFormComponent } from './features/book-features/components/book-form/book-form.component';
import { CreateBookComponent } from './features/book-features/components/create-book/create-book.component';
import { EditBookComponent } from './features/book-features/components/edit-book/edit-book.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'books/details/:id',
    component: DetailsPageComponent,
  },
  {
    path: 'books/create',
    component: CreateBookComponent,
  },
  {
    path: 'books/edit/:id',
    component: EditBookComponent,
  },
  {
    path: 'books',
    component: BooksTableComponent,
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
  {
    path: 'category/:id',
    component: ListComponent,
  },
];
