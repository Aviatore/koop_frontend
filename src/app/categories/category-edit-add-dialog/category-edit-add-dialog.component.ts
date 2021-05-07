import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryDataDialog} from '../models/category-data-dialog';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-category-edit-add-dialog',
  templateUrl: './category-edit-add-dialog.component.html',
  styleUrls: ['./category-edit-add-dialog.component.css']
})
export class CategoryEditAddDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CategoryDataDialog,
              private service: CategoryService,
              private dialogRef: MatDialogRef<CategoryEditAddDialogComponent>) { }

  ngOnInit(): void {
  }

  editCategory(categoryId: string | null, categoryName: string, picture: string): void {
    this.service.addEditCategoryService(categoryId, categoryName, picture)
      .subscribe((data) => {
          this.dialogRef.close({msg: data.info});
        },
        err => {
          if ('error' in err.error) {
            this.dialogRef.close({msg: err.error.error});
          } else if ('detail' in err.error) {
            this.dialogRef.close({msg: err.error.detail});
          }
        });
  }
}
