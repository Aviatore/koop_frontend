import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersListComponent} from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'admin/user/new',
    component: UserEditComponent
  },
  {
    path: 'admin/user/all',
    component: UsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
