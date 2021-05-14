import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserCreateComponent} from './user-create/user-create.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AdminComponent} from './admin/admin.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ProductCreatorComponent} from './product-editor/product-creator.component';
import {SuppliersListComponent} from './modules/suppliers/suppliers-list/suppliers-list.component';
import {SupplierDetailComponent} from './modules/suppliers/supplier-detail/supplier-detail.component';
import {SupplierInfoComponent} from './modules/suppliers/supplier-info/supplier-info.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'user/new',
        component: UserCreateComponent
      },
      {
        path: 'user/all',
        component: UsersListComponent
      },
      {
        path: 'user/edit/:userId',
        component: UserEditComponent,
        data: {adminMode: true}
      },
      {
        path: 'product/new',
        component: ProductCreatorComponent
      },
      {
        path: 'suppliers',
        component: SuppliersListComponent
      },
      {
        path: 'supplier/:id/edit',
        component: SupplierDetailComponent
      },
      {
        path: 'supplier/add',
        component: SupplierDetailComponent
      },
      {
        path: 'supplier/:id',
        component: SupplierInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
