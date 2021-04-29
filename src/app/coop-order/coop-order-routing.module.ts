import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {CoopOrdersComponent} from './coop-orders/coop-orders.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getCoopOrders, component: CoopOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoopOrderRoutingModule { }
