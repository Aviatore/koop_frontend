import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {BacketViewComponent} from './backet-view/backet-view.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getBasketView, component: BacketViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketViewRoutingModule { }
