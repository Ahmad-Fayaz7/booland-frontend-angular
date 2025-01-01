import { Component, Input } from '@angular/core';
import { CategoryDTO } from '../../../features/book-features/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  getUrl(): any {
    console.log('THE URL IS: ', this.category?.imageUrl);
    return 'http://localhost:8000/images/categories/A_Brief_History_Of_Humankind.jpg';
  }
  @Input() category: CategoryDTO | undefined;
  ngOnInit() {}
}
