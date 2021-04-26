import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnitComponent} from './unit/unit.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { homePageUrl } from '../environments/environment';
import {SuppliersListComponent} from './suppliers/suppliers-list/suppliers-list.component';

const routes: Routes = [
  { path: 'units', component: UnitComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: homePageUrl, pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
  // { path: 'allsuppliers', component: SuppliersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
