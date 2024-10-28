import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './layout/component/auth/login/login.component';
import { RegisterComponent } from './layout/component/auth/register/register.component';
import { HomeComponent } from './layout/component/home/home.component';
import { AuthComponent } from './layout/component/auth/auth/auth.component';
import { CartComponent } from './layout/component/cart/cart.component';
import { ProductsComponent } from './layout/component/products/products.component';
import { ProductDetailComponent } from './layout/component/product-detail/product-detail.component';
import { ProfilePageComponent } from './layout/component/profile-page/profile-page.component';
import { PasswordRecoveryComponent } from './layout/component/auth/password-recovery/password-recovery.component';
import { ViewAnagraphicComponent } from './layout/component/commons/profile/view-anagraphic/view-anagraphic.component';
import { ChartSellingsComponent } from './layout/component/commons/profile/chart/chart-sellings.component';

const routes: Routes = [
  { path: '', redirectTo: 'OfficeOasis/home', pathMatch: 'full' },
  {
    path: 'OfficeOasis',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:search', component: ProductsComponent },
      { path: 'products/:search/:category', component: ProductsComponent },
      { path: 'products/:search/:category/:orderBy', component: ProductsComponent },
      { path: 'profile', component: ProfilePageComponent , children: 
        [
          { path: 'viewAnagraphicData', component: ViewAnagraphicComponent},
          { path: 'chartSellings', component: ChartSellingsComponent},
        ],
      },
      { path: 'product-detail/:n', component: ProductDetailComponent },
      { path: 'auth', component: AuthComponent, children: 
        [
          { path: 'login', component: LoginComponent },
          { path: 'passwordRecovery/:token', component: PasswordRecoveryComponent },
          { path: 'login/:token', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
