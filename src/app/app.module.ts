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
    AlertModule.forRoot({maxMessages: 5, timeout: 3000}),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
