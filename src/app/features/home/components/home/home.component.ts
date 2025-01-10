import { Component } from '@angular/core';
import { FeaturedBooksComponent } from '../../../book-features/components/featured-books/featured-books.component';
import { MenuComponent } from '../../../../core/components/menu/menu.component';
import { CategoriesComponent } from '../../../book-features/components/categories/categories.component';
import { HeroComponent } from '../hero/hero.component';
import { BookService } from '../../../book-features/services/book.service';
import { BookDTO } from '../../../book-features/models/book.model';
import { CategoryDTO } from '../../../book-features/models/category.model';
import { CategoryService } from '../../../book-features/services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeaturedBooksComponent,
    MenuComponent,
    CategoriesComponent,
    HeroComponent,
    FeaturedBooksComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private bookService: BookService,
    private categoriesService: CategoryService
  ) {}
  featuredBooks!: BookDTO[];
  categoryList!: CategoryDTO[];
  ngOnInit() {
    this.bookService.getFeaturedBooks().subscribe((res) => {
      this.featuredBooks = res;
    });

    this.categoriesService.getCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }
}
