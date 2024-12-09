import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDTO } from '../models/book.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  public getBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`${this.apiUrl}/books`);
  }

  public getBooksByCategory(category: string): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(
      `${this.apiUrl}/books/category/${category}`
    );
  }

  public getBook(id: string): Observable<BookDTO> {
    return this.http.get<BookDTO>(`${this.apiUrl}/books/${id}`);
  }
}
