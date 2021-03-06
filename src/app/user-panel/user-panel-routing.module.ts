import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user/user.component';
import {UserEditComponent} from '../admin/user-edit/user-edit.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'edit',
        component: UserEditComponent,
        data: {adminMode: false}
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
