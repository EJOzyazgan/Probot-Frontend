import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';
import {AuthService} from '../../services/auth.service';
import { VerificationDialogComponent } from 'src/app/shared/dialogs/verification-dialog/verification-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['../auth.scss']
})
export class EmailVerificationComponent implements OnInit {
  email;
  token;
  isValid = false;
  validating = false;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,
              private router: Router,
              private dataService: DataService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.dataService.currentEmail.subscribe(email => this.email = email);

    this.validate();
  }

  validate() {
    if (this.token) {
      this.validating = true;
      this.authService.validateEmail(this.token).subscribe(valid => {
        this.isValid = true;
      }, err => {
        this.alertService.warning('Invalid Email');
        return this.router.navigate(['/auth']);
      });
    } else {
      this.router.navigate(['./auth/login'])
    }
  }

  toggleDialog(){
    const dialogRef = this.dialog.open(VerificationDialogComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.resendVerification(result).subscribe(res => {
          if (res['msg']) {
            return this.alertService.warning(res['msg']);
          }
          this.alertService.success('Verification Email Sent');
        }, err => {
          this.alertService.danger('Could not send email');
        }); 
      }
    });
  }

}
