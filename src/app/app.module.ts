import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from 'ngx-alerts';
import {GameTableComponent} from './game-table/game-table.component';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user.service';
import {TournamentService} from './services/tournament.service';
import {SharedModule} from './shared/shared.module';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';
import {DataService} from './services/data.service';
import {BotService} from './services/bot.service';
import {GoogleAnalyticsService} from './services/google-analytics.service';
import {TableService} from './services/table.service';
import {MetricService} from './services/metric.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    GameTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    Ng2GoogleChartsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 3000}),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    UserService,
    TournamentService,
    DataService,
    BotService,
    TableService,
    MetricService,
    GoogleAnalyticsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
