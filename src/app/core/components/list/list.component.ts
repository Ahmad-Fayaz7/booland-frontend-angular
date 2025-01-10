import { Component, Input } from '@angular/core';
import { BookDTO } from '../../../features/book-features/models/book.model';
import { ListService } from '../../services/list.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { searchResultsDTO } from '../../models/list.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private route: ActivatedRoute
  ) {}
  searchForm!: FormGroup;
  page: number = 1;
  limit: number = 2;
  total: number = 0;
  categoryId: string = '';
  categoryName: string = '';
  startIdx: number = 1;
  endIdx: number = 10;
  results: searchResultsDTO = {
    totalPages: 0,
    currentPage: 0,
    totalDocuments: 0,
    books: [],
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.searchForm = this.formBuilder.group({
          searchTerm: '',
        });
        this.categoryId = id;

        this.fetchBooks();
      } else {
        console.error('Category ID is missing from the route');
      }
    });

    this.route.queryParamMap.subscribe((params) => {
      const name = params.get('category');
      this.categoryName = name || '';
    });
  }

  fetchBooks() {
    this.listService
      .getBooksByCategory({
        category: this.categoryId,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
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
    this.listService
      .searchBooksByTitleAndCategory(searchTerm, this.categoryId)
      .subscribe({
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

  resetInitials() {
    this.page = 1;
    this.limit = 10;
  }
}
