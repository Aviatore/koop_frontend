import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Info} from '../../stores/models/info';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../models/category';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'categoryId',
    'categoryName',
    'picture',
    'actionButtons'
  ];
  info: Info;
  problem: string;
  categories: Category[];
  dataSource: MatTableDataSource<Category>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  getCategories(): void {
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

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            return this.categories;
          }
        },
        err => {
          this.info = undefined;
          this.categories = undefined;
          this.problem = err.error.detail;
        });
  }

  openCategoryEditDialog(categoryId: string, categoryName: string, picture: string): void {

  }

  openCategoryAddDialog(): void {
  }
}
