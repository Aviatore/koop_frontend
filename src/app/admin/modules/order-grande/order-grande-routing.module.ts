import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {BasketsComponent} from './baskets/baskets.component';


const routes: Routes = [
  {path: 'orders/all', component: OrdersListComponent},
  {path: 'order/add', component: OrderDetailComponent},
  {path: 'order/baskets', component: BasketsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderGrandeRoutingModule { }
