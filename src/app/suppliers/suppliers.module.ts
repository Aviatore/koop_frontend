import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SuppliersRoutingModule } from './suppliers-routing.module';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ReportService} from '../reports/services/report.service';
import {SupplierService} from './supplier.service';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';



@NgModule({
  declarations: [
    SuppliersListComponent,
    SupplierDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    SuppliersRoutingModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  exports: [
    SupplierDetailComponent,
    SuppliersListComponent,
    MatNativeDateModule
  ],
  providers: [
    SupplierService
  ]
})
export class SuppliersModule { }
