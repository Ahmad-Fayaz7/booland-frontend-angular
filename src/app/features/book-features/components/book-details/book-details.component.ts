import { Component, Input, Output } from '@angular/core';
import { BookDTO } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'], // Fixed typo
})
export class BookDetailsComponent {
  @Input() book: BookDTO | undefined;
}
