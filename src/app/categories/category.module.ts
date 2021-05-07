import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoryEditAddDialogComponent } from './category-edit-add-dialog/category-edit-add-dialog.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryEditAddDialogComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class CategoryModule { }
