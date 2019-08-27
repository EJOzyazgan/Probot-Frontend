import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GettingStartedComponent } from './getting-started.component';
import { SetupBotComponent } from './setup-bot/setup-bot.component';
import { PokerRulesComponent } from './poker-rules/poker-rules.component';

const gettingStartedRoutes: Routes = [
  { path: '', component: GettingStartedComponent, children: [
      { path: '', redirectTo: 'setup-bot', pathMatch: 'full'},
      { path: 'setup-bot', component: SetupBotComponent},
      { path: 'poker-rules', component: PokerRulesComponent},
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(gettingStartedRoutes)
  ],
  exports: [RouterModule]
})
export class GettingStartedRoutingModule {
}
