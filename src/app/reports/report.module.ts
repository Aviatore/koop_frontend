import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportCoopDebtComponent } from './report-coop-debt/report-coop-debt.component';
import { ReportDropdownMenuComponent } from './report-dropdown-menu/report-dropdown-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from './services/report.service';
import { ReportPackListComponent } from './report-pack-list/report-pack-list.component';
import {MatIconModule} from '@angular/material/icon';
import { ReportSupplierReceivablesComponent } from './report-supplier-receivables/report-supplier-receivables.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReportGrandeOrderComponent } from './report-grande-order/report-grande-order.component';
import {NgReplacePipeModule} from 'angular-pipes';
import {FlexModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { ReportOrderBySupplierComponent } from './report-order-by-supplier/report-order-by-supplier.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
  declarations: [
    ReportCoopDebtComponent,
    ReportDropdownMenuComponent,
    ReportPackListComponent,
    ReportSupplierReceivablesComponent,
    ReportGrandeOrderComponent,
    ReportOrderBySupplierComponent
  ],
  exports: [
    ReportDropdownMenuComponent
  ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        HttpClientModule,
        MatTableModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatListModule,
        MatSidenavModule,
        NgReplacePipeModule,
        FlexModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatSelectModule,
        FormsModule,
        MaterialModule
    ],
  providers: [
    ReportService,
  ]
})
export class ReportModule { }
