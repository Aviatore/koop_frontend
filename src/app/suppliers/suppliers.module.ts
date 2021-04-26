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

@NgModule({
  declarations: [
    SuppliersListComponent,
    SupplierDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SuppliersRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  exports: [
    SupplierDetailComponent,
    SuppliersListComponent
  ],
  providers: [
    SupplierService
  ]
})
export class SuppliersModule { }
