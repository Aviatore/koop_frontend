import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {BasketViewComponent} from './basket-view/basket-view.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getBasketView, component: BasketViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketViewRoutingModule { }
