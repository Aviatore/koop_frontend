import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportCoopDebtComponent} from './report-coop-debt/report-coop-debt.component';
import {ReportPackListComponent} from './report-pack-list/report-pack-list.component';
import {ReportSupplierReceivablesComponent} from './report-supplier-receivables/report-supplier-receivables.component';
import {AppUrl} from '../urls/app-url';
import {ReportGrandeOrderComponent} from './report-grande-order/report-grande-order.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getReportCoopDebt, component: ReportCoopDebtComponent},
  {path: AppUrl.ROUTE.getReportPackList, component: ReportPackListComponent},
  {path: AppUrl.ROUTE.getReportSupReceivables, component: ReportSupplierReceivablesComponent},
  {path: AppUrl.ROUTE.getReportGrandeOrder, component: ReportGrandeOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
