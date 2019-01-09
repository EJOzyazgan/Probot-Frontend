import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';


@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
