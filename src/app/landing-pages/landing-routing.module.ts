import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPagesComponent} from './landing-pages.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EventComponent} from './event/event.component';

const landingPagesRoutes: Routes = [
  { path: '', component: LandingPagesComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent, data: {title: 'Home'}},
      {path: 'getting-started', loadChildren: () => import('./getting-started/getting-started.module').then(m => m.GettingStartedModule)},
      {path: 'legal', loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)},
      { path: 'about-us', component: AboutComponent, data: {title: 'About Us'}},
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
