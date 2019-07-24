import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FriendRequestComponent} from './friend-request/friend-request.component';

const authRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signup/:referralCode', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'email-verification', component: EmailVerificationComponent},
  {path: 'email-verification/:token', component: EmailVerificationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: 'friend-request/:userReferral/:friendReferral', component: FriendRequestComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
