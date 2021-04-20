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

@NgModule({
  declarations: [
    ReportCoopDebtComponent,
    ReportDropdownMenuComponent,
    ReportPackListComponent,
    ReportSupplierReceivablesComponent
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
  ],
  providers: [
    ReportService,
  ]
})
export class ReportModule { }
