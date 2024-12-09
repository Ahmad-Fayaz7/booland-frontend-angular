import { Component, Input } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../models/book.model';
import { BookListComponent } from '../book-list/book-list.component';
import { CategoryDTO } from '../../models/category.model';

@Component({
  selector: 'app-related-books',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './related-books.component.html',
  styleUrl: './related-books.component.css',
})
export class RelatedBooksComponent {
  constructor(private bookService: BookService) {}
  @Input() categories!: CategoryDTO[];
  @Input() bookList!: BookDTO[];
}
