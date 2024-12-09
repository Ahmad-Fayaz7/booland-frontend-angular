import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.css',
})
export class QuantitySelectorComponent {
  quantity: number = 1;
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }
}
