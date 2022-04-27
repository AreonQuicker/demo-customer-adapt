import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListPageComponent } from './pages/customer/customer-list-page/customer-list-page.component';
import { pathRoutes } from './config/config';
import { CustomerCreatePageComponent } from './pages/customer/customer-create-page/customer-create-page.component';
import { CustomerUpdatePageComponent } from './pages/customer/customer-update-page/customer-update-page.component';

const routes: Routes = [
  { path: '', redirectTo: pathRoutes.customerSearch.path, pathMatch: 'full' },
  {
    path: pathRoutes.customerSearch.path,
    component: CustomerListPageComponent,
  },
  {
    path: pathRoutes.customerCreate.path,
    component: CustomerCreatePageComponent,
  },
  {
    path: pathRoutes.customerUpdate.path,
    component: CustomerUpdatePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
