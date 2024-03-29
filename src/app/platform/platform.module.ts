import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {PlatformComponent} from './platform.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlatformRoutingModule} from './platform-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BotComponent} from './bot/bot.component';
import {LobbyComponent} from './lobby/lobby.component';
import {TournamentComponent} from './tournament/tournament.component';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBotsComponent } from './admin-bots/admin-bots.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SupportComponent } from './support/support.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    PlatformComponent,
    DashboardComponent,
    BotComponent,
    LobbyComponent,
    TournamentComponent,
    ProfileComponent,
    AdminDashboardComponent,
    AdminBotsComponent,
    LeaderboardComponent,
    SupportComponent,
    MarketPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    PlatformRoutingModule,
    AngularFontAwesomeModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ]
})
export class PlatformModule {
}
