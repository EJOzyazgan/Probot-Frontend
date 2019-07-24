import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email;

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  resetPassword() {
    if (this.email && this.email.trim() !== '') {
      this.authService.resetPassword(this.email).subscribe(email => {
        this.alertService.success(email['msg']);
        this.router.navigate(['/auth/login']);
      });
    } else {
      this.alertService.warning('Please enter email');
    }
  }
}
