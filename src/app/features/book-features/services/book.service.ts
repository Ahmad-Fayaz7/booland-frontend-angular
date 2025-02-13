import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCreationDTO, BookDTO } from '../models/book.model';
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

  public searchBooksByTitle(title: string): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`${this.apiUrl}/books/search/${title}`);
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

  public createBook(book: BookCreationDTO): Observable<BookDTO> {
    const formData = this.buildFormData(book);
    return this.http.post<BookDTO>(`${this.apiUrl}/books/create`, formData);
  }

  public editBook(id: string, book: BookCreationDTO): Observable<BookDTO> {
    const formData = this.buildFormData(book);
    return this.http.put<BookDTO>(`${this.apiUrl}/books/edit/${id}`, formData);
  }

  private buildFormData(book: BookCreationDTO): FormData {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('isbn', book.isbn);
    //formData.append('coverImageUrl', book.coverImageUrl);
    formData.append('price', book.price.toString());
    formData.append('stock', book.stock.toString());
    formData.append('category', JSON.stringify(book.category));
    formData.append('description', book.description);
    // Handle file or existing image URL
    if (book.coverImageUrl instanceof File) {
      formData.append('coverImageUrl', book.coverImageUrl);
    } else {
      this.fetchImageAsBlob(book.coverImageUrl as string).then((blob) => {
        formData.append('coverImageUrl', blob, 'current-cover.jpg');
      });
    }
    return formData;
  }

  async fetchImageAsBlob(imageUrl: string): Promise<Blob> {
    try {
      const response = await fetch(imageUrl);
      return await response.blob();
    } catch (error) {
      console.error('Error fetching image blob:', error);
      throw error;
    }
  }
}
