import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

const routes: Routes = [
  {path: 'allsuppliers', component: SuppliersListComponent},
  {path: 'supplier/:id', component: SupplierDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
