import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MultipleSelector } from '../models/multiple-selector.model';

@Injectable({
  providedIn: 'root',
})
export class MultipleSelectorService {
  private selectedCategories = new BehaviorSubject<MultipleSelector[]>([]);
  selectedCategoriesObservable = this.selectedCategories.asObservable();

  // Handles changes on selected categories
  changeOnCategories(categories: MultipleSelector[]) {
    this.selectedCategories.next(categories);
  }
}
