import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LandingPagesComponent} from './landing-pages.component';
import {LandingPagesRoutingModule} from './landing-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EventComponent} from './event/event.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { SharedModule } from '../shared/shared.module';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    LandingPagesComponent,
    HomeComponent,
    AboutComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingPagesRoutingModule,
    SharedModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    SlideshowModule,
  ]
})
export class LandingPagesModule {}
