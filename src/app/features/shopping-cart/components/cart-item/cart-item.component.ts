import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { QuantitySelectorComponent } from '../../../../core/components/quantity-selector/quantity-selector.component';
import { RemoveItemBtnComponent } from '../../../../core/components/remove-item-btn/remove-item-btn.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  encapsulation: ViewEncapsulation.None, // or ShadowDom for shadow DOM encapsulation
})
export class CartItemComponent {
  constructor(private cartService: CartService) {}

  @Output() itemRemoval = new EventEmitter<any>();
  removeItem(item: any) {
    this.itemRemoval.emit(item);
  }
  @Input() item: any;
  quantity: number = 1;
  itemPrice: number = 0;
  cartTotalPrice: number = 0;
  @Output() priceChange = new EventEmitter<number>();

  ngOnInit() {
    this.quantity = this.item.quantity;
    this.itemPrice = this.item.quantity * this.item.book.price;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateItemPrice();
      this.updateQuantity(this.quantity);
    }
  }

  increment() {
    this.quantity++;
    this.calculateItemPrice();
    this.updateQuantity(this.quantity);
  }

  updateQuantity(q: number) {
    if (q < 1 || q > 100) {
      this.quantity = 1;
    }
    this.priceChange.emit(this.quantity);
    this.calculateItemPrice();
    this.cartService
      .updateCart(this.item.book._id, this.quantity)
      .subscribe((res) => {});
  }

  calculateItemPrice() {
    this.itemPrice = this.quantity * this.item.book.price;
    this.itemPrice = Math.round(this.itemPrice * 100) / 100;
  }
}
