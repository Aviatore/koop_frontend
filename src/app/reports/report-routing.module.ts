import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportCoopDeptComponent} from './report-coop-dept/report-coop-dept.component';

const routes: Routes = [
  {path: 'report-coop-dept', component: ReportCoopDeptComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
