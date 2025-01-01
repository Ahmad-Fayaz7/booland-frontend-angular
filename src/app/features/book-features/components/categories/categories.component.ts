import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CategoryDTO } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../../../core/components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  @Input() categories: CategoryDTO[] = [];

  ngOnInit() {
    console.log(this.categories);
  }
}
