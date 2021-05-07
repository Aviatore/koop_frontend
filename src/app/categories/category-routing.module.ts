import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
  {path: AppUrl.ROUTE.getCategories, component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
