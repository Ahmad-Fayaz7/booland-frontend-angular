import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/user-auth/services/auth.service';
import { CartService } from '../../../features/shopping-cart/services/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}
  numOfCartItems: number = 0; // number of different items in cart

  ngOnInit() {
    this.cartService.changeOnNumOfCartItems();
    this.cartService.numOfCartItems.subscribe(
      (res) => (this.numOfCartItems = res)
    );
  }
  logout() {
    this.authService.logout();
    this.numOfCartItems = 0;
  }
}
