import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserComponent } from './user/user.component';
import {AdminModule} from '../admin/admin.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
