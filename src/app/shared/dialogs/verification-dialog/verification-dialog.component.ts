import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html',
  styleUrls: ['./verification-dialog.component.scss']
})
export class VerificationDialogComponent {

  emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailControl = new FormControl('', Validators.compose(
    [Validators.pattern(this.emailRegEx), Validators.required]
  ));

  constructor(
    public dialogRef: MatDialogRef<VerificationDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
