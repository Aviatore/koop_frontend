import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import {SupplierInfoComponent} from './supplier-info/supplier-info.component';

const routes: Routes = [
  {path: 'allsuppliers', component: SuppliersListComponent},
  {path: 'supplier/:id/edit', component: SupplierDetailComponent},
  {path: 'supplier/add', component: SupplierDetailComponent},
  {path: 'supplier/:id', component: SupplierInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
