import { Component } from '@angular/core';
import { BookListComponent } from '../../../book-features/components/book-list/book-list.component';
import { MenuComponent } from '../../../../core/components/menu/menu.component';
import { CategoriesComponent } from '../../../book-features/components/categories/categories.component';
import { HeroComponent } from '../hero/hero.component';
import { BookService } from '../../../book-features/services/book.service';
import { BookDTO } from '../../../book-features/models/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookListComponent,
    MenuComponent,
    CategoriesComponent,
    HeroComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private bookService: BookService) {}
  bookList!: BookDTO[];
  ngOnInit() {
    this.bookService.getBooks().subscribe((res) => {
      this.bookList = res;
    });
  }
}
