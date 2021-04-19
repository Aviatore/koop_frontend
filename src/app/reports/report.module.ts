import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportCoopDeptComponent } from './report-coop-dept/report-coop-dept.component';
import { ReportDropdownMenuComponent } from './report-dropdown-menu/report-dropdown-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from './services/report.service';
import { ReportPackListComponent } from './report-pack-list/report-pack-list.component';
import {MatIconModule} from '@angular/material/icon';
import { ReportSupplierReceivablesComponent } from './report-supplier-receivables/report-supplier-receivables.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ReportCoopDeptComponent,
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
  ],
  providers: [
    ReportService,
  ]
})
export class ReportModule { }
