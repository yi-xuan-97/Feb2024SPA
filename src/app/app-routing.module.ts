import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Public/product-list.component';
import { ProductDetailsComponent } from './Public/product-details.component';
import { OrdersComponent } from './Public/orders.component';
import { CustomerComponent } from './Public/customer.component';
import { AuthGuard } from './Core/Guards/auth.guard';
import { AdminGuard } from './Core/Guards/admin.guard';

const routes: Routes = [
  { path: "Product", component: ProductListComponent },
  { path: "Product/:id", component: ProductDetailsComponent },
  { path: "Customer", component: CustomerComponent, canActivate: [AuthGuard] },
  { path: "Account", loadChildren: () => import('./Account/account.module').then(m => m.AccountModule) },
  { path: "Admin", loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule), canLoad: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
