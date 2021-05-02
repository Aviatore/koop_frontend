import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserComponent } from './user/user.component';
import { UserEditSelfComponent } from './user-edit-self/user-edit-self.component';
import {AdminModule} from '../admin/admin.module';


@NgModule({
  declarations: [
    UserComponent,
    UserEditSelfComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
