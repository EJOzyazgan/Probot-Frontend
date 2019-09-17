import { Component} from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-tos-dialog',
  templateUrl: './tos-dialog.component.html',
  styleUrls: ['./tos-dialog.component.scss']
})
export class TosDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TosDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
