import { CategoryDTO } from './category.model';

export interface BookDTO {
  category: CategoryDTO[] | string[];
  _id: string;
  author: string;
  description: string;
  coverImageUrl: string;
  isbn: string;
  price: number;
  title: string;
  __v: number;
}
