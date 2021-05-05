import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { NewEmailComponent } from './new-email/new-email.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    NewEmailComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PasswordResetModule { }
