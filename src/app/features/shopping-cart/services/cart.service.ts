import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CategoryDTO } from '../../book-features/models/category.model';
import { BookDTO } from '../../book-features/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<number>(0);
  numOfCartItems = this.cartItems.asObservable();

  // Handles changes on number of items in cart
  changeOnNumOfCartItems() {
    this.getCart().subscribe((cart) => {
      const result = cart.cartItems.length;
      this.cartItems.next(result);
    });
  }

  // Remove from cart
  removeFromCart(id: string) {
    return this.http.delete(`${this.apiUrl}/cart/${id}`);
  }

  // Update cart
  updateCart(bookId: string, quantity: number) {
    return this.http.post(`${this.apiUrl}/cart/`, { bookId, quantity });
  }
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  // Get cart
  public getCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/`);
  }

  // Add items to cart
  public addToCart(bookId: string) {
    return this.http.post(`${this.apiUrl}/cart/${bookId}`, null);
  }

  // Get similar books
  public getSimilarBooks(books: BookDTO[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart/similar/`, { books });
  }

  // Get number of items in cart
  public numOfItemsInCart() {
    this.getCart().subscribe((cart) => {
      const numItems = cart.cartItems.length;
    });
  }
}
