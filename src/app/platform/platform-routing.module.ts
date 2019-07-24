import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformComponent} from './platform.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BotComponent} from './bot/bot.component';
import {LobbyComponent} from './lobby/lobby.component';
import {TournamentComponent} from './tournament/tournament.component';
import {ProfileComponent} from './profile/profile.component';


const platformRoutes: Routes = [
  {
    path: '', component: PlatformComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'bot', component: BotComponent},
      {path: 'lobby', component: LobbyComponent},
      {path: 'profile', component: ProfileComponent}
      // {path: 'tournament', component: TournamentComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(platformRoutes)
  ],
  exports: [RouterModule]
})
export class PlatformRoutingModule {
}
