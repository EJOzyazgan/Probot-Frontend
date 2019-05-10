import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {GoogleChartsModule} from 'angular-google-charts';

@NgModule({
  declarations: [
    PlatformComponent,
    DashboardComponent,
    BotComponent,
    LobbyComponent,
    TournamentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    PlatformRoutingModule,
    AngularFontAwesomeModule,
    GoogleChartsModule.forRoot()
  ]
})
export class PlatformModule {
}
