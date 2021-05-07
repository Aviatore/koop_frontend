import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Info} from '../../stores/models/info';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../models/category';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoryService} from '../services/category.service';
import {MatDialog} from '@angular/material/dialog';
import {CategoryEditAddDialogComponent} from '../category-edit-add-dialog/category-edit-add-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private service: CategoryService,
              public addEditDialog: MatDialog,
              private snackBarAddEdit: MatSnackBar) {
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
    const dialogRef = this.addEditDialog.open(CategoryEditAddDialogComponent, {
      data: {
        dialogFlag: 'EditCategory',
        categoryId,
        categoryName,
        picture
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
      if (result.msg !== undefined) {
        this.openSnackBarAddEdit(result.msg);
      }
    });
  }

  openCategoryAddDialog(): void {
    const dialogRef = this.addEditDialog.open(CategoryEditAddDialogComponent, {
      data: {
        dialogFlag: 'AddCategory',
        categoryId: null,
        categoryName: '',
        picture: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
      if (result.msg !== undefined) {
        this.openSnackBarAddEdit(result.msg);
      }
    });
  }

  openSnackBarAddEdit(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('The new category has been added.')) {
      message = 'Nowa kategoria została dodana.';
      snackBarCss = 'snack-bar-green';
    } else if (message !== undefined && message.includes('The category has been updated.')) {
      message = 'Kategoria została zaktualizowana.';
      snackBarCss = 'snack-bar-green';
    } else if (message !== undefined && message.includes('Something went wrong, the category')) {
      message = 'Coś poszło nie tak, kategoria nie została dodana.';
    } else if (message !== undefined && message.includes('The category with ID:')) {
      message = 'Kategoria nie jest dostępna.';
    } else if (message !== undefined && message.includes('The category field cannot be empty.')) {
      message = 'Pole kategorii nie może być puste. Kategoria nie została dodana.';
    }
    this.snackBarAddEdit.open(message, action, {
      duration: 3500,
      panelClass: snackBarCss
    });
  }
}