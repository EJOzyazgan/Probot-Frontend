import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login-signup.scss']
})
export class SignupComponent implements OnInit {
  user = new User(null);
  disableSignup = false;
  confirmPassword = '';
  agreeTos = true;

  referralCode;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.referralCode = this.route.snapshot.paramMap.get('referralCode');
    this.user.referredBy = this.referralCode;
  }

  signUp() {
    this.disableSignup = true;
    if (this.user.email && this.user.email.trim() !== '' &&
      this.user.password && this.user.password.trim() !== '' &&
      this.user.username && this.user.username.trim() !== '' &&
      this.confirmPassword && this.confirmPassword.trim() !== '' &&
      this.agreeTos) {


      if (this.user.password !== this.confirmPassword) {
        this.disableSignup = false;
        return this.alertService.warning('Passwords Do Not Match');
      } else if (this.user.password.length < 8) {
        this.disableSignup = false;
        return this.alertService.warning('Password must be at least 8 characters long');
      }
      this.authService.checkExists(this.user.email, this.user.username).subscribe(user => {
        if (user['exists']) {
          this.disableSignup = false;
          return this.alertService.warning(user['msg']);
        }

        this.authService.signUp(this.user).subscribe(() => {
          this.dataService.changeEmail(this.user.email);
          return this.router.navigate(['/auth/email-verification']);
        }, err => {
          this.disableSignup = false;
          this.alertService.danger(err['error']['errors']['email']['message']);
        });
      });
    } else {
      this.disableSignup = false;
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
      case 'email':
        this.user.email = value;
        break;
    }
  }
}
