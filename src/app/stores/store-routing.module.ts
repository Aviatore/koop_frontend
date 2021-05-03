import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {StoreComponent} from './store/store.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getStore, component: StoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
