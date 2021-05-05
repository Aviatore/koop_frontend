import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserEditComponent,
    UsersListComponent
  ],
  exports: [
    AdminComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
