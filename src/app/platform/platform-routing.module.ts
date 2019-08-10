import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformComponent} from './platform.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BotComponent} from './bot/bot.component';
import {LobbyComponent} from './lobby/lobby.component';
import {TournamentComponent} from './tournament/tournament.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminBotsComponent} from './admin-bots/admin-bots.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {SupportComponent} from './support/support.component';


const platformRoutes: Routes = [
  {
    path: '', component: PlatformComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin-dashboard', component: AdminDashboardComponent},
      {path: 'bot', component: BotComponent},
      {path: 'admin-bots', component: AdminBotsComponent},
      {path: 'lobby', component: LobbyComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'leader-board', component: LeaderboardComponent},
      {path: 'support', component: SupportComponent},
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
