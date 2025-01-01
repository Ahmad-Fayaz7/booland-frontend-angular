import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoryDTO } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  public getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.apiUrl}/categories`);
  }

  /* public getBook(id: string): Observable<BookDTO> {
    return this.http.get<BookDTO>(`${this.apiUrl}/books/${id}`);
  } */
}
