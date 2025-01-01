import { BookDTO } from './book.model';

export interface CategoryDTO {
  _id: string;
  name: string;
  books: BookDTO[];
  imageUrl: string;
}
