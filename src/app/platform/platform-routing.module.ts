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
import { MarketPlaceComponent } from './market-place/market-place.component';


const platformRoutes: Routes = [
  {
    path: '', component: PlatformComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'admin-dashboard', component: AdminDashboardComponent, data: {title: 'Admin Dashboard'}},
      {path: 'bot', component: BotComponent, data: {title: 'Bot Dashboard'}},
      {path: 'admin-bots', component: AdminBotsComponent, data: {title: 'Admin Bot Dashboard'}},
      {path: 'lobby', component: LobbyComponent, data: {title: 'Lobby'}},
      {path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
      {path: 'leader-board', component: LeaderboardComponent, data: {title: 'Leaderboard'}},
      {path: 'support', component: SupportComponent, data: {title: 'Support'}},
      {path: 'store', component: MarketPlaceComponent, data: {title: 'Store'}},
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
