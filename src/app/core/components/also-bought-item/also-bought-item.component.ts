import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { BookDTO } from '../../../features/book-features/models/book.model';
import { CartService } from '../../../features/shopping-cart/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-also-bought-item',
  standalone: true,
  imports: [AddToCartBtnComponent, RouterModule],
  templateUrl: './also-bought-item.component.html',
  styleUrl: './also-bought-item.component.css',
})
export class AlsoBoughtItemComponent {
  constructor(private cartService: CartService) {}
  @Input() book!: BookDTO;
  @Output() onAddToCart = new EventEmitter();

  addToCart() {
    if (!this.book || this.book === undefined) {
      console.log('Book is undefined...');
      return;
    }
    this.cartService.addToCart(this.book?._id).subscribe({
      next: () => {
        console.log('Item added...');
        this.cartService.changeOnNumOfCartItems();
        this.onAddToCart.emit();
      },
      error: (error) => {
        console.log('Error occured: ', error);
      },
    });
  }
}
