import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserComponent } from './user/user.component';
import {AdminModule} from '../admin/admin.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    PasswordResetComponent
  ],
    imports: [
        CommonModule,
        AdminModule,
        RxReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        UserPanelRoutingModule
    ]
})
export class UserPanelModule { }
