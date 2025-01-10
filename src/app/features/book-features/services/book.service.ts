import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDTO } from '../models/book.model';
import { environment } from '../../../../environments/environment';
import { searchResultsDTO } from '../../../core/models/list.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  public getFeaturedBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`${this.apiUrl}/books/featured`);
  }

  public getBooksByCategory(category: string): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(
      `${this.apiUrl}/books/category/${category}`
    );
  }

  public getBook(id: string): Observable<BookDTO> {
    return this.http.get<BookDTO>(`${this.apiUrl}/books/${id}`);
  }

  public getBooksPaginated(
    page: number,
    limit: number
  ): Observable<searchResultsDTO> {
    return this.http.get<searchResultsDTO>(
      `${this.apiUrl}/books?page=${page}&limit=${limit}`
    );
  }
}
