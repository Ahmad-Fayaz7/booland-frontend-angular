import { Component, Input, Output } from '@angular/core';
import { BookDTO } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { AddToCartBtnComponent } from '../../../../core/components/add-to-cart-btn/add-to-cart-btn.component';
import { CartService } from '../../../shopping-cart/services/cart.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, AddToCartBtnComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'], // Fixed typo
})
export class BookDetailsComponent {
  constructor(private cartService: CartService) {}
  @Input() book: BookDTO | undefined;

  addToCart() {
    if (!this.book || this.book === undefined) {
      console.log('Book is undefined...');
      return;
    }
    this.cartService.addToCart(this.book?._id).subscribe({
      next: () => {
        console.log('Item added...');
        this.cartService.changeOnNumOfCartItems();
        //this.onAddToCart.emit();
      },
      error: (error) => {
        console.log('Error occured: ', error);
      },
    });
  }
}
