import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserCreateComponent} from './user-create/user-create.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AdminComponent} from './admin/admin.component';
import {UserEditComponent} from './user-edit/user-edit.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
