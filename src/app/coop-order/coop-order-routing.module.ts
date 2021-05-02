import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {CoopOrdersComponent} from './coop-orders/coop-orders.component';
import {CoopLastOrderComponent} from './coop-last-order/coop-last-order.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getCoopOrders, component: CoopOrdersComponent},
  {path: AppUrl.ROUTE.getCoopLastOrder, component: CoopLastOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoopOrderRoutingModule { }
