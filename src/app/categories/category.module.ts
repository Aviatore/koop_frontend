import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoryEditAddDialogComponent } from './category-edit-add-dialog/category-edit-add-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UploadImgDialogComponent } from './upload-img-dialog/upload-img-dialog.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryEditAddDialogComponent,
    UploadImgDialogComponent
  ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        MaterialModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class CategoryModule { }
