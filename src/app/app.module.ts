import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './layout/component/auth/login/login.component';
import { RegisterComponent } from './layout/component/auth/register/register.component';
import { HomeComponent } from './layout/component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './layout/component/commons/footer/footer.component';
import { AuthComponent } from './layout/component/auth/auth/auth.component';
import { CardsComponent } from './layout/component/commons/cards/cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './layout/component/products/products.component';
import { GoogleSigninComponent } from './layout/component/auth/social-sign/google-signin/google-signin.component';
import { SocialSignComponent } from './layout/component/auth/social-sign/social-sign.component';
import { DropDawnMenuComponent } from './layout/component/commons/drop-down-menu/drop-down-menu.component';
import { ProductDetailComponent } from './layout/component/product-detail/product-detail.component';
import { ProfilePageComponent } from './layout/component/profile-page/profile-page.component';
import { AsideDashboardComponent } from './layout/component/commons/aside-dashboard/aside-dashboard.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { AngularMaterialModule } from './utils/material-module';
import { NotificationService } from './services/transfer-data/notification.service';
import { RatingComponent } from './layout/component/commons/rating/rating.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PasswordRecoveryComponent } from './layout/component/auth/password-recovery/password-recovery.component';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { CustomPaginatorComponent } from './layout/component/commons/custom-paginator/custom-paginator.component';
import { SearchBarComponent } from './layout/component/commons/search-bar/search-bar.component';
import { CartComponent } from './layout/component/cart/cart.component';
import { AccountDetailsComponent } from './layout/component/commons/account-details/account-details.component';
import { ChartSellingsComponent } from './layout/component/commons/profile/chart/chart-sellings.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ViewAnagraphicComponent } from './layout/component/commons/profile/view-anagraphic/view-anagraphic.component';
import { CreateAnagraphicComponent } from './layout/component/commons/profile/create-anagraphic/create-anagraphic.component';
import { DynamicTableDataEditComponent } from './layout/component/commons/dynamic-table-data-edit/dynamic-table-data-edit.component';
import { ViewAddressesComponent } from './layout/component/commons/profile/view-addresses/view-addresses.component';
import { CreateAddressesComponent } from './layout/component/commons/profile/create-addresses/create-addresses.component';
import { AddNewAddrBtnComponent } from './layout/component/commons/profile/add-new-addr-btn/add-new-addr-btn.component';
import { PdfViewerComponent } from './layout/component/commons/profile/pdf-viewer/pdf-viewer.component';
const socialAuthConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '554321010226-4h631gc2ctutqffegajr268qpli352je',
        {
          scopes: 'openid profile email',
        }
      ),
    },
  ],
  onError: (errorRes) => {
    NotificationService.showDynamicResponseAlert(
      notifications.ICO_ERROR,
      errorRes.error.message,
      4000
    );
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    AuthComponent,
    CardsComponent,
    ProductsComponent,
    GoogleSigninComponent,
    SocialSignComponent,
    DropDawnMenuComponent,
    ProductDetailComponent,
    ProfilePageComponent,
    AsideDashboardComponent,
    ProductDetailComponent,
    RatingComponent,
    PasswordRecoveryComponent,
    CustomPaginatorComponent,
    SearchBarComponent,
    AccountDetailsComponent,
    ChartSellingsComponent,
    CartComponent,
    ViewAnagraphicComponent,
    CreateAnagraphicComponent,
    DynamicTableDataEditComponent,
    ViewAddressesComponent,
    CreateAddressesComponent,
    AddNewAddrBtnComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({}),
    NgApexchartsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
