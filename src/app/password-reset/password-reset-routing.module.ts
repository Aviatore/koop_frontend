import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmailFormComponent} from './email-form/email-form.component';
import {NewEmailComponent} from './new-email/new-email.component';

const routes: Routes = [
  {
    path: 'password-reset',
    component: EmailFormComponent
  },
  {
    path: 'password-reset/new-email/:userId/:passwordResetToken',
    component: NewEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }
