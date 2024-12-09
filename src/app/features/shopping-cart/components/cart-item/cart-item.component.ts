import { Component, Input, ViewEncapsulation } from '@angular/core';
import { QuantitySelectorComponent } from '../../../../core/components/quantity-selector/quantity-selector.component';
import { RemoveItemBtnComponent } from '../../../../core/components/remove-item-btn/remove-item-btn.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [QuantitySelectorComponent, RemoveItemBtnComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  encapsulation: ViewEncapsulation.None, // or ShadowDom for shadow DOM encapsulation
})
export class CartItemComponent {
  @Input() item: any;

  ngOnInit() {
    console.log(this.item.book.coverImageUrl);
  }
}
