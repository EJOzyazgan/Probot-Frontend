import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LegalRoutingModule } from './legal-routing.module';
import { TosComponent } from './tos/tos.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalComponent } from './legal.component';
import { CcpaComponent } from './ccpa/ccpa.component';

@NgModule({
    declarations: [
        TosComponent,
        PrivacyPolicyComponent,
        LegalComponent,
        CcpaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        LegalRoutingModule,
        SharedModule,
    ]
})
export class LegalModule { }