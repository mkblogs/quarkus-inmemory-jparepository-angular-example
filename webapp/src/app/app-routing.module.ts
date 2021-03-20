import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GetallaccountsComponent } from './getallaccounts/getallaccounts.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { SuccUserComponent } from './succ-user/succ-user.component';
import { SuccAccountComponent } from './succ-account/succ-account.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* tslint:disable */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'}, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'account', component: CreateAccountComponent },
  { path: 'accounts', component: GetallaccountsComponent },
  { path: 'succ-account', component: SuccAccountComponent },
  { path: 'view-account/:accountId', component: ViewAccountComponent },
  { path: 'user', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'succ-user', component: SuccUserComponent },
  { path: 'view-user/:userId', component: ViewUserComponent },
  { path: 'user/changepassword', component: ChangePasswordComponent },
  { path: 'notfound', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
