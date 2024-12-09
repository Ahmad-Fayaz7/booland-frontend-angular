import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  public getCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/`);
  }
}
