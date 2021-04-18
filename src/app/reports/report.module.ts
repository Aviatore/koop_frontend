import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportCoopDeptComponent } from './report-coop-dept/report-coop-dept.component';
import { ReportDropdownMenuComponent } from './report-dropdown-menu/report-dropdown-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ReportCoopDeptComponent,
    ReportDropdownMenuComponent
  ],
  exports: [
    ReportDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class ReportModule { }
