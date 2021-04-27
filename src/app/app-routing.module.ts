import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnitComponent} from './unit/unit.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppUrl} from './urls/app-url';

const routes: Routes = [
  { path: AppUrl.ROUTE.getUnits, component: UnitComponent },
  { path: AppUrl.HOME_PAGE_URL, component: HomeComponent },
  { path: AppUrl.ROUTE.getLogin, component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
