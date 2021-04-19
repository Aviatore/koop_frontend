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

@NgModule({
  declarations: [
    ReportCoopDeptComponent,
    ReportDropdownMenuComponent,
    ReportPackListComponent
  ],
  exports: [
    ReportDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    ReportService,
  ]
})
export class ReportModule { }
