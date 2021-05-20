import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService} from './services/category.service';
import {Category} from './models/category';
import {Info} from './models/info';
import {MatTableDataSource} from '@angular/material/table';
import {AppUrl} from '../../../urls/app-url';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  info: Info;
  problem: string;
  url = AppUrl.DOMAIN;
  emptyImage = AppUrl.EMPTYIMAGE;

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.service.getCategoriesService()
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.categories = undefined;
            this.problem = undefined;
          } else {
            this.info = undefined;
            this.categories = data;
            this.problem = undefined;

            return this.categories;
          }
        },
        err => {
          this.info = undefined;
          this.categories = undefined;
          this.problem = err.error.detail;
        });
  }
}
