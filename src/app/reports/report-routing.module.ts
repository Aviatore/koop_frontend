import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportCoopDebtComponent} from './report-coop-dept/report-coop-debt.component';
import {ReportPackListComponent} from './report-pack-list/report-pack-list.component';
import {ReportSupplierReceivablesComponent} from './report-supplier-receivables/report-supplier-receivables.component';

const routes: Routes = [
  {path: 'report-coop-debt', component: ReportCoopDebtComponent},
  {path: 'report-pack-list', component: ReportPackListComponent},
  {path: 'report-supplier-receivables', component: ReportSupplierReceivablesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
