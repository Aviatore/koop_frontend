import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StoreDataDialog} from '../../stores/models/store-data-dialog';
import {CategoryDataDialog} from '../models/category-data-dialog';

@Component({
  selector: 'app-category-edit-add-dialog',
  templateUrl: './category-edit-add-dialog.component.html',
  styleUrls: ['./category-edit-add-dialog.component.css']
})
export class CategoryEditAddDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CategoryDataDialog) { }

  ngOnInit(): void {
  }

}
