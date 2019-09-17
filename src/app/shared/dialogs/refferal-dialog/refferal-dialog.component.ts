import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
  chips: number;
}

@Component({
  selector: 'app-refferal-dialog',
  templateUrl: './refferal-dialog.component.html',
  styleUrls: ['./refferal-dialog.component.scss']
})
export class RefferalDialogComponent {

  emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailControl = new FormControl('', Validators.compose(
    [Validators.pattern(this.emailRegEx), Validators.required]
  ));

  constructor(
    public dialogRef: MatDialogRef<RefferalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
