import { CategoryDTO } from './category.model';

export interface BookDTO {
  category: CategoryDTO[];
  _id: string;
  author: string;
  coverImageUrl: string;
  isbn: string;
  price: number;
  title: string;
  __v: number;
}
