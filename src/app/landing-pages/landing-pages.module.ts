import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LandingPagesComponent } from './landing-pages.component';
import { LandingPagesRoutingModule } from './landing-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventComponent } from './event/event.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedModule } from '../shared/shared.module';
import { SlideshowModule } from 'ng-simple-slideshow';import { HighlightModule } from 'ngx-highlightjs';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

export function hljsLanguages() {
  return [
    { name: 'javascript', func: javascript},
    { name: 'python', func: python}];
}

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
    HighlightModule.forRoot({languages: hljsLanguages}),
  ]
})
export class LandingPagesModule { }
