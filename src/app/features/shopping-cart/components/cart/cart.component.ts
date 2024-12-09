import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddToCartBtnComponent } from '../../../../core/components/add-to-cart-btn/add-to-cart-btn.component';
import { AlsoBoughtItemComponent } from '../../../../core/components/also-bought-item/also-bought-item.component';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    AddToCartBtnComponent,
    AlsoBoughtItemComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  cart: Cart | null = null;
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService
      .getCart()
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch cart items:', error);
          return of({ cartItems: [] }); // Return an empty array in case of error
        })
      )
      .subscribe((cart: Cart) => {
        this.cartItems = cart.cartItems;
        console.log('Items are', this.cartItems);
      });
  }
}
