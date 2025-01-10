import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BookDTO } from '../../features/book-features/models/book.model';
import { filterDTO, searchResultsDTO } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  public getBooksByCategory(filter: filterDTO): Observable<searchResultsDTO> {
    return this.http.post<searchResultsDTO>(
      `${this.apiUrl}/books/category`,
      filter
    );
  }

  public searchBooksByTitleAndCategory(
    searchTerm: string,
    category: string
  ): Observable<BookDTO[]> {
    return this.http.post<BookDTO[]>(`${this.apiUrl}/books/search`, {
      searchTerm,
      category,
    });
  }
}
