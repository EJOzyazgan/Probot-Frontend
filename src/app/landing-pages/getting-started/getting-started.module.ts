import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SetupBotComponent } from './setup-bot/setup-bot.component';
import { PokerRulesComponent } from './poker-rules/poker-rules.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        SetupBotComponent,
        PokerRulesComponent,
        GettingStartedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        GettingStartedRoutingModule,
        SharedModule,
    ]
})
export class GettingStartedModule { }