import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category, CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]>;

  constructor(private CategorieS: CategoriesService) { }

  ngOnInit(): void {
    console.log(`Getting categories ...`);
    this.categories = this.CategorieS.GetCategories();
  }
}
