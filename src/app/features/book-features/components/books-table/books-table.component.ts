import { Component } from '@angular/core';
import { searchResultsDTO } from '../../../../core/models/list.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}
  searchForm!: FormGroup;
  page: number = 1;
  limit: number = 4;
  total: number = 0;
  categoryId: string = '';
  startIdx: number = 1;
  endIdx: number = 10;
  results: searchResultsDTO = {
    totalPages: 0,
    currentPage: 0,
    totalDocuments: 0,
    books: [],
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get('page') ? +params.get('page')! : 1;
      this.limit = params.get('limit') ? +params.get('limit')! : 10;
      this.searchForm = this.formBuilder.group({
        searchTerm: '',
      });
      this.fetchBooks();
    });
  }

  fetchBooks() {
    this.bookService.getBooksPaginated(this.page, this.limit).subscribe({
      next: (res) => {
        this.results = res;
        this.setIdxes();
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      },
    });
  }

  setIdxes() {
    if (this.results.totalDocuments < this.limit) {
      this.limit = this.results.totalDocuments;
    }
    this.startIdx = (this.page - 1) * this.limit + 1;
    this.endIdx = this.page * this.limit;
    if (this.endIdx > this.results.totalDocuments) {
      this.endIdx = this.results.totalDocuments;
    }
  }

  nextPage() {
    console.log('Next page', this.results.totalPages);
    if (this.page < this.results.totalPages) {
      this.page++;
      this.fetchBooks();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchBooks();
    }
  }

  // Navigate to a specific page
  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.fetchBooks();
  }

  // Generate dynamic page numbers
  getPages(): number[] {
    const totalPages = this.results.totalPages;
    const pages = [];

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // For more than 5 pages, show current and surrounding pages
      const start = Math.max(1, this.page - 1);
      const end = Math.min(totalPages, this.page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  search() {
    const searchTerm = this.searchForm.value.searchTerm;
    console.log(searchTerm);
    if (!searchTerm || searchTerm.length === 0 || searchTerm.trim() === '') {
      console.log('Page: ', this.page);
      console.log('Limit: ', this.limit);
      console.log('total pages: ', this.results.totalPages);
      this.resetInitials();
      this.fetchBooks();
      return;
    }
    this.bookService.searchBooksByTitle(searchTerm).subscribe({
      next: (res) => {
        this.results.books = res;
        this.results.totalDocuments = res.length;
        this.results.totalPages = Math.ceil(res.length / this.limit);
        this.setIdxes();
      },
      error: (error) => {
        console.error('Error searching books:', error);
      },
    });
  }
  getCategoryNames(categories: any[]): string {
    return categories.map((c) => c.name).join(', ');
  }

  resetInitials() {
    this.page = 1;
    this.limit = 10;
  }
}
