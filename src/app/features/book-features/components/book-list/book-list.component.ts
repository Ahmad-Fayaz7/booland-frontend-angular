import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../models/book.model';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../core/components/card/card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookListComponent {
  @Input() bookList: BookDTO[] = [];

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {}
}
