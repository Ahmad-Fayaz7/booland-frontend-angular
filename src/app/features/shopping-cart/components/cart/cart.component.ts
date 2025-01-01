import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlsoBoughtItemComponent } from '../../../../core/components/also-bought-item/also-bought-item.component';
import { BookDTO } from '../../../book-features/models/book.model';
import { RouterModule } from '@angular/router';

interface CartItem {
  id: string;
  book: BookDTO;
  price: number;
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
  totalPrice: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    AlsoBoughtItemComponent,
    RouterModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  cart!: Cart;
  cartItems: CartItem[] = [];
  similarBooks: BookDTO[] = [];
  totalCartPrice: number = 0;
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
        this.cart = cart;
        this.cartItems = cart.cartItems;
        this.calculateTotalCartPrice();
        this.getSimilarBooks();
      });
  }

  getSimilarBooks() {
    // from cart items get the books with thier categories
    const booksInCart = this.cartItems.map((item) => {
      return item.book;
    });

    this.cartService.getSimilarBooks(booksInCart).subscribe((res) => {
      console.log(res);
      this.similarBooks = res;
    });
  }

  onItemRemoval(item: any) {
    this.cartService.removeFromCart(item.book._id).subscribe((res) => {
      this.getCartItems();
      this.cartService.changeOnNumOfCartItems();
    });
  }
  onPriceChange(quantity: number, updatedItem: any) {
    const targetItem = this.cartItems.find(
      (item) => item.book._id === updatedItem.book._id
    );
    if (targetItem) {
      targetItem.quantity = quantity;
      const result = this.calculateTotalCartPrice();
    }
    // Recalculate the total price
    //this.getCartItems();
  }
  calculateTotalCartPrice() {
    this.totalCartPrice = this.cartItems.reduce(
      (total, item) => total + item.quantity * item.book.price,
      0
    );
    this.totalCartPrice = Math.round(this.totalCartPrice * 100) / 100;
  }

  addBook() {
    this.getCartItems();
  }
}
