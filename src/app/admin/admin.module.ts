import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserEditComponent } from './user-edit/user-edit.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RoleSelectorComponent } from './role-selector/role-selector.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserCreateComponent,
    UsersListComponent,
    UserEditComponent,
    RoleSelectorComponent
  ],
  exports: [
    AdminComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    AdminRoutingModule,
    MatTooltipModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ]
})
export class AdminModule { }
