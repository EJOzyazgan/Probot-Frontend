import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { TooltipComponent } from './tooltip/tooltip.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { MatExpansionModule } from '@angular/material';
import { TosComponent } from './tos/tos.component';
import { TosDialogComponent } from './dialogs/tos-dialog/tos-dialog.component';
import { FriendDialogComponent } from './dialogs/friend-dialog/friend-dialog.component';
import { RefferalDialogComponent } from './dialogs/refferal-dialog/refferal-dialog.component';
import { PurchaseDialogComponent } from './dialogs/purchase-dialog/purchase-dialog.component';


@NgModule({
  declarations: [
    TooltipComponent,
    CustomInputComponent,
    TosComponent,
    TosDialogComponent,
    FriendDialogComponent,
    RefferalDialogComponent,
    PurchaseDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    AngularFontAwesomeModule,
    AngularSvgIconModule,
    MatExpansionModule,
  ],
  providers: [],
  entryComponents: [
    TosDialogComponent,
    FriendDialogComponent,
    RefferalDialogComponent,
    PurchaseDialogComponent,
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    AngularFontAwesomeModule,
    AngularSvgIconModule,
    TooltipComponent,
    CustomInputComponent,
    TosComponent,
    MatExpansionModule,
    TosDialogComponent,
    FriendDialogComponent,
    RefferalDialogComponent,
    PurchaseDialogComponent,
  ]
})
export class SharedModule {}
