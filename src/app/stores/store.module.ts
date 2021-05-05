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
import { StoreSupplierComponent } from './store-supplier/store-supplier.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StoreSupplierEditDialogComponent } from './store-supplier-edit-dialog/store-supplier-edit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    StoreComponent,
    StoreEditDialogComponent,
    StoreSupplierComponent,
    StoreSupplierEditDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    StoreRoutingModule,
    FormsModule,
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule { }
