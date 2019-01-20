import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule, MatProgressSpinnerModule, MatDialogModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
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
    MatMenuModule
  ],
  providers: [],
  entryComponents: [],
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
    MatMenuModule
  ]
})
export class SharedModule {}
