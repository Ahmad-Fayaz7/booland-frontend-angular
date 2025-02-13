import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultipleSelectorComponent } from '../../../../core/components/multiple-selector/multiple-selector.component';
import { CategoryService } from '../../services/category.service';
import { CategoryDTO } from '../../models/category.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookCreationDTO, BookDTO } from '../../models/book.model';
import { MultipleSelector } from '../../../../core/models/multiple-selector.model';
import { MultipleSelectorService } from '../../../../core/services/multiple-selector.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MultipleSelectorComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private multipleSelectorService: MultipleSelectorService
  ) {}

  @Input() options: MultipleSelector[] = [];
  @Input() selectedOptions: MultipleSelector[] = [];
  @Input() model: BookDTO | null = null;
  @Output() onSaveChanges = new EventEmitter<BookCreationDTO>();
  bookForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isEditMode = false;
  ngOnInit(): void {
    // Creates the form and its elements
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: '',
      isbn: '',
      coverImageUrl: '',
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: '',
      description: '',
    });
    if (this.model !== undefined && this.model !== null) {
      console.log('Model:', this.model);
      this.bookForm.patchValue(this.model);
      this.isEditMode = true;
    }
  }

  saveChanges() {
    this.multipleSelectorService.selectedCategoriesObservable.subscribe(
      (categories) => {
        this.bookForm.value.category = categories.map(
          (category) => category.key
        );

        if (this.bookForm.invalid) {
          return;
        }
        if (!this.isEditMode && !this.selectedFile) {
          return;
        }
        if (
          this.isEditMode &&
          this.bookForm.get('coverImageUrl')?.value === '' &&
          !this.selectedFile
        ) {
          return;
        }
        this.onSaveChanges.emit(this.bookForm.value);
      }
    );
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
      this.bookForm.get('coverImageUrl')?.setValue(this.selectedFile);
      if (this.model) {
        this.model.coverImageUrl = '';
      }
    }
  }
}
