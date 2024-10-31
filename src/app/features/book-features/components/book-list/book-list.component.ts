import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  constructor(private bookService: BookService) {}
  bookList: BookDTO[] = [];
  ngOnInit() {
    this.bookService.getBooks().subscribe((res) => {
      console.log(res);
      this.bookList = res;
      console.log(this.bookList.length);
    });
  }
}
