import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GetallaccountsComponent } from './getallaccounts/getallaccounts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { AccountServiceService } from './services/account/account-service.service';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from './services/user/user.service';
import { SuccUserComponent } from './succ-user/succ-user.component';
import { SuccAccountComponent } from './succ-account/succ-account.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    GetallaccountsComponent,
    CreateAccountComponent,
    UsersComponent,
    UserComponent,
    ViewAccountComponent,
    SuccUserComponent,
    SuccAccountComponent,
    ViewUserComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     AccountServiceService,
     UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
