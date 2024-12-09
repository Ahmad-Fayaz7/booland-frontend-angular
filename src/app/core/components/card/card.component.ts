import { Component, Input } from '@angular/core';
import { BookDTO } from '../../../features/book-features/models/book.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() book: BookDTO | undefined;
}
