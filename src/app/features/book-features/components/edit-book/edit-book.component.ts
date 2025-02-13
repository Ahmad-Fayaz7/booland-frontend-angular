import { ChangeDetectorRef, Component } from '@angular/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookCreationDTO, BookDTO } from '../../models/book.model';
import { MultipleSelector } from '../../../../core/models/multiple-selector.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryDTO } from '../../models/category.model';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [BookFormComponent, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}
  options: MultipleSelector[] = [];
  selectedOptions: MultipleSelector[] = [];
  categories: CategoryDTO[] = [];
  model!: BookDTO;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // Set all categories as options
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
        this.options = categories.map((category) => ({
          key: category._id,
          value: category.name,
        }));
      });

      // Manually trigger change detection
      this.cdRef.detectChanges();
      // Set selected categories
      if (id) {
        this.bookService.getBook(id).subscribe((book) => {
          this.selectedOptions = book.category.map((category) => {
            return <MultipleSelector>{
              key: category._id,
              value: category.name,
            };
          });
          // Set the model
          this.model = book;
          console.log('Book:', book);
          // Force UI update
          this.cdRef.detectChanges();
        });
      }
    });
  }
  saveChanges(book: BookCreationDTO) {
    this.bookService.editBook(this.model._id, book).subscribe((updatedBook) => {
      // console.log(updatedBook);
      // console.log('Book edited');
    });
  }
}
