import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'user/new',
        component: UserEditComponent
      },
      {
        path: 'user/all',
        component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
