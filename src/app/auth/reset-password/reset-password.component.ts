import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.scss']
})
export class ResetPasswordComponent implements OnInit {
  user = new User(null);
  confirmPassword = null;
  token;
  disable = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.setJWT(this.token);
    this.authService.validateResetPassword().subscribe(user => {
      this.user = user;
      this.user.password = null;
    }, (err) => {
      this.alertService.danger(err['error']['msg']);
      return this.router.navigate(['/auth/login']);
    });
  }

  saveNewPassword() {
    this.disable = true;
    if (this.user.password && this.user.password.trim() !== '' &&
      this.confirmPassword && this.confirmPassword.trim() !== '') {

      if (this.user.password !== this.confirmPassword) {
        this.disable = false;
        return this.alertService.warning('Passwords Do Not Match');
      } else if (this.user.password.length < 8) {
        this.disable = false;
        return this.alertService.warning('Password must be at least 8 characters long');
      }

      this.authService.patchUser(this.user).subscribe(user => {
        this.alertService.success('Password reset successfully');
        this.authService.removeTokens();
        return this.router.navigate(['/auth/login']);
      });
    } else {
      this.disable = false;
      this.alertService.warning('Please Fill In All Fields');
    }

  }

  setValue(value, field) {
    switch (field) {
      case 'tempPass':
        this.user.password = value;
        break;
      case 'confirmPass':
        this.confirmPassword = value;
        break;
    }
  }

}
