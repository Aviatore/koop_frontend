import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store.component';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StoreService} from './service/store.service';
import { StoreEditDialogComponent } from './store-edit-dialog/store-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    StoreComponent,
    StoreEditDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    StoreRoutingModule,
    MatDialogModule,
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule { }
