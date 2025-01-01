import { Component, Input } from '@angular/core';
import { BookDTO } from '../../../features/book-features/models/book.model';
import { CartService } from '../../../features/shopping-cart/services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
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
      },
      error: (error) => {
        console.log('Error occured: ', error);
      },
    });
  }
}
