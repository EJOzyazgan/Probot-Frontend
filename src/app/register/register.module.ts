import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    RegisterRoutingModule,
    CommonModule
  ]
})
export class RegisterModule {}
