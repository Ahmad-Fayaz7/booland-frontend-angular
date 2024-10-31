import { Component } from '@angular/core';
import { BookListComponent } from '../../../book-features/components/book-list/book-list.component';
import { MenuComponent } from '../../../../core/components/menu/menu.component';
import { CategoriesComponent } from '../../../book-features/components/categories/categories.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookListComponent,
    MenuComponent,
    CategoriesComponent,
    HeroComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
