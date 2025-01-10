import { BookDTO } from '../../features/book-features/models/book.model';

export interface filterDTO {
  category: string;
  page: number;
  limit: number;
}

export interface searchResultsDTO {
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
  books: BookDTO[];
}
