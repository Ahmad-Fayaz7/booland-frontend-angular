import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDTO } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>('http://localhost:8000/api/books');
  }
}
