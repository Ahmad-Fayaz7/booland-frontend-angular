import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

import { BookDTO } from '../../models/book.model';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [BookDetailsComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  book: BookDTO | undefined;
  categories: any[] = [];
  similarBooks: any[] = [];
  ngOnInit() {
    this.loadBook();
  }

  loadBook() {
    const id = this.route.snapshot.params['id'];
    this.bookService.getBook(id).subscribe((response) => {
      this.book = response;
      if (this.book) {
        this.categories = [...this.book.category];
        this.getRelatedBooks();
      }
    });
  }

  getRelatedBooks() {
    const bookSet = new Set(this.similarBooks.map((b) => b._id)); // Track unique books
    this.categories.forEach((cat) => {
      this.bookService.getBooksByCategory(cat._id).subscribe((books) => {
        books.forEach((book) => {
          if (!bookSet.has(book._id)) {
            this.similarBooks.push(book);
            bookSet.add(book._id);
          }
        });
      });
    });
  }
}
