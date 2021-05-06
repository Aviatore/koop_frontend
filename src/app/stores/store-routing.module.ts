import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {StoreComponent} from './store/store.component';
import {StoreSupplierComponent} from './store-supplier/store-supplier.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getStore, component: StoreComponent},
  {path: AppUrl.ROUTE.getSupplierStore, component: StoreSupplierComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
