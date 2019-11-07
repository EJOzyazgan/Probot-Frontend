import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from 'ngx-alerts';
import {GameTableComponent} from './game-table/game-table.component';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {TournamentService} from './services/tournament.service';
import {SharedModule} from './shared/shared.module';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';
import {DataService} from './services/data.service';
import {BotService} from './services/bot.service';
import {GoogleAnalyticsService} from './services/google-analytics.service';
import {TableService} from './services/table.service';
import {MetricService} from './services/metric.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FlexLayoutModule} from '@angular/flex-layout';
import {AuthInterceptor} from './services/authInterceptor.service';
import {environment} from '../environments/environment';
import { PurchaseService } from './services/purchase.service';
import { HighlightModule } from 'ngx-highlightjs';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

export function hljsLanguages() {
  return [
    { name: 'javascript', func: javascript},
    { name: 'python', func: python}];
}

const config: SocketIoConfig = { url: `${environment.domain}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    Ng2GoogleChartsModule,
    FlexLayoutModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 3000}),
    SocketIoModule.forRoot(config),
    HighlightModule.forRoot({languages: hljsLanguages}),
  ],
  providers: [
    AuthService,
    TournamentService,
    DataService,
    BotService,
    TableService,
    MetricService,
    GoogleAnalyticsService,
    PurchaseService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
