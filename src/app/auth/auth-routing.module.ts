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
  {path: 'signup', component: SignupComponent, data: {title: 'Sign-Up'}},
  {path: 'signup/:referralCode', component: SignupComponent, data: {title: 'Sign-Up'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'email-verification', component: EmailVerificationComponent, data: {title: 'Email Verification'}},
  {path: 'email-verification/:token', component: EmailVerificationComponent, data: {title: 'Email Verification'}},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'}},
  {path: 'reset-password/:token', component: ResetPasswordComponent, data: {title: 'Reset Password'}},
  {path: 'friend-request/:userReferral/:friendReferral', component: FriendRequestComponent, data: {title: 'Friend Request'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
