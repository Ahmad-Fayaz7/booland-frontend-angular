import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../models/book.model';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../core/components/card/card.component';

@Component({
  selector: 'app-featured-books',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './featured-books.component.html',
  styleUrl: './featured-books.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturedBooksComponent {
  @Input() featuredBooks: BookDTO[] = [];

  constructor() {}

  ngOnInit() {}
}
