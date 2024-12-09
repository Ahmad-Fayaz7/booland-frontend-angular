import { Component } from '@angular/core';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';

@Component({
  selector: 'app-also-bought-item',
  standalone: true,
  imports: [AddToCartBtnComponent],
  templateUrl: './also-bought-item.component.html',
  styleUrl: './also-bought-item.component.css',
})
export class AlsoBoughtItemComponent {}
