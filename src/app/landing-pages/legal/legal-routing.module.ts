import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LegalComponent } from './legal.component';
import { TosComponent } from './tos/tos.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CcpaComponent } from './ccpa/ccpa.component';

const legalRoutes: Routes = [
  { path: '', component: LegalComponent, children: [
      { path: '', redirectTo: 'tos', pathMatch: 'full'},
      { path: 'tos', component: TosComponent, data: {title: 'Terms of Service'}},
      { path: 'privacy-policy', component: PrivacyPolicyComponent, data: {title: 'Privacy Policy'}},
      { path: 'ccpa', component: CcpaComponent, data: {title: 'CCPA'}}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(legalRoutes)
  ],
  exports: [RouterModule]
})
export class LegalRoutingModule {
}