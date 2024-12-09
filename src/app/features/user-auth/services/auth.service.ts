import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreationDTO, UserCredentials } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  private readonly tokenKey: string = 'token';

  register(user: UserCreationDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user, {
      observe: 'response',
    });
  }

  login(userCredentials: UserCredentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, userCredentials);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Check if the token exists
  }

  // Logout method
  logout() {
    localStorage.removeItem(this.tokenKey); // Clear the token
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
