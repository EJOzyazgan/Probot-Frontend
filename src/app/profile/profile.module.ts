import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {OverviewComponent} from './overview/overview.component';
import {ProfileComponent} from './profile.component';


@NgModule({
  declarations: [
    OverviewComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule {
}
