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
import {OrdersListComponent} from './modules/order-grande/orders-list/orders-list.component';
import {OrderDetailComponent} from './modules/order-grande/order-detail/order-detail.component';
import {BasketsComponent} from './modules/order-grande/baskets/baskets.component';
import {AppUrl} from "../urls/app-url";
import {CategoryComponent} from "./modules/categories/category/category.component";

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
        path: 'allsuppliers',
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
      },
      {
        path: 'orders/all',
        component: OrdersListComponent
      },
      {
        path: 'order/add',
        component: OrderDetailComponent
      },
      {
        path: 'order/baskets',
        component: BasketsComponent
      },
      {
        path: AppUrl.ROUTE.getCategories,
        component: CategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
