import { CategoryDTO } from './category.model';

export interface BookDTO {
  category: CategoryDTO[];
  _id: string;
  author: string;
  description: string;
  coverImageUrl: string;
  isbn: string;
  price: number;
  stock: number;
  title: string;
  __v: number;
}

export interface BookCreationDTO {
  category: CategoryDTO[] | string[];
  author: string;
  description: string;
  coverImageUrl: File;
  isbn: string;
  price: number;
  stock: number;
  title: string;
  __v: number;
}
