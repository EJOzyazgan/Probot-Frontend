import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-friend-dialog',
  templateUrl: './friend-dialog.component.html',
  styleUrls: ['./friend-dialog.component.scss']
})
export class FriendDialogComponent {
  emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailControl = new FormControl('', Validators.compose(
    [Validators.pattern(this.emailRegEx), Validators.required]
  ));

  constructor(
    public dialogRef: MatDialogRef<FriendDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
