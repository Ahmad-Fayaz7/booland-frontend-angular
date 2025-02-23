import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryDTO } from '../../models/category.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { MultipleSelector } from '../../../../core/models/multiple-selector.model';
import { BookCreationDTO } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css',
})
export class CreateBookComponent {
  constructor(
    private categoryService: CategoryService,
    private bookService: BookService,
    private router: Router
  ) {}
  categories: CategoryDTO[] = [];
  options: MultipleSelector[] = [];

  model: BookCreationDTO | null = null;
  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.options = categories.map((category) => ({
        key: category._id,
        value: category.name,
      }));
    });
  }

  saveChanges(book: BookCreationDTO) {
    this.model = book;
    this.bookService.createBook(this.model).subscribe((response) => {
      this.router.navigate(['/books/details', response.newBookId]);
    });
  }
}
