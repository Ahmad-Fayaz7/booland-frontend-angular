import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultipleSelector } from '../../models/multiple-selector.model';
import { MultipleSelectorService } from '../../services/multiple-selector.service';

@Component({
  selector: 'app-multiple-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css',
})
export class MultipleSelectorComponent {
  constructor(private multipleSelectorService: MultipleSelectorService) {}
  @Input() options: MultipleSelector[] = [];

  @Input() selectedOptions: MultipleSelector[] = []; // Selected items
  searchText: string = ''; // Text input for filtering
  dropdownVisible = false; // To toggle dropdown visibility

  ngOnInit(): void {
    // Assuming each option has a unique `id`
    const selectedIds = this.selectedOptions.map((option) => option.key);

    this.options = this.options.filter(
      (option) => !selectedIds.includes(option.key)
    );

    this.multipleSelectorService.changeOnCategories(this.selectedOptions);
  }

  // Add option to selectedOptions
  selectOption(option: MultipleSelector): void {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
    }
    this.searchText = '';
    this.dropdownVisible = false;
    this.updateCategories();
  }

  // Remove selected option
  removeOption(option: MultipleSelector): void {
    this.selectedOptions = this.selectedOptions.filter(
      (item) => item !== option
    );
    this.updateCategories();
  }

  // Clear all selected options
  clearAll(): void {
    this.selectedOptions = [];
    this.updateCategories();
  }

  // Filter options based on search text
  get filteredOptions(): MultipleSelector[] {
    return this.options.filter(
      (option) =>
        option.value.toLowerCase().includes(this.searchText.toLowerCase()) &&
        !this.selectedOptions.includes(option)
    );
  }

  updateCategories(): void {
    this.multipleSelectorService.changeOnCategories(this.selectedOptions);
  }
}
