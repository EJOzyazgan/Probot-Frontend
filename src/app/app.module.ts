import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from 'ngx-alerts';
import { GameTableComponent } from './game-table/game-table.component';
import { GameViewComponent } from './game-view/game-view.component';

@NgModule({
    declarations: [
        AppComponent,
        RoutingComponents,
        GameTableComponent,
        GameViewComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AlertModule.forRoot({maxMessages: 5, timeout: 3000})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
