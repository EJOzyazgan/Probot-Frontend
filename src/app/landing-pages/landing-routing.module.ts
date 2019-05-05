import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPagesComponent} from './landing-pages.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EventComponent} from './event/event.component';

const landingPagesRoutes: Routes = [
  { path: '', component: LandingPagesComponent, children: [
      { path: 'home', component: HomeComponent},
      // { path: 'about', component: AboutComponent},
      // { path: 'events', component: EventComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(landingPagesRoutes)
  ],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule {
}
