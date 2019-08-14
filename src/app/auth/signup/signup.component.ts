import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {DataService} from '../../services/data.service';
import * as moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login-signup.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SignupComponent implements OnInit {
  user = new User(null);
  confirmPassword = '';
  agreeTos = false;
  confirmAge = false;

  showTos = false;

  referralCode;

  genders = ['Female', 'Male', 'Other'];

  minDate = moment().subtract(18, 'y');
  date = new FormControl({
    value: this.minDate,
    disabled: true,
  }, Validators.required);

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

  setDob(event: MatDatepickerInputEvent<Date>) {
    this.user.dob = event.value;
  }

  signUp() {
    if (this.user.password !== this.confirmPassword) {
      return this.alertService.warning('Passwords Do Not Match');
    } else if (this.user.password.length < 8) {
      return this.alertService.warning('Password must be at least 8 characters long');
    }
    this.authService.checkExists(this.user.email, this.user.username).subscribe(user => {
      if (user['exists']) {
        return this.alertService.warning(user['msg']);
      }

      this.authService.signUp(this.user).subscribe(() => {
        this.dataService.changeEmail(this.user.email);
        return this.router.navigate(['/auth/email-verification']);
      }, err => {
        this.alertService.danger(err['error']['errors']['email']['message']);
      });
    });
  }

  isValid() {
    return this.user.email && this.user.email.trim() !== '' &&
      this.user.password && this.user.password.trim() !== '' &&
      this.user.username && this.user.username.trim() !== '' &&
      this.confirmPassword && this.confirmPassword.trim() !== '' &&
      this.agreeTos && this.confirmAge;
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

  toggleTos() {
    this.showTos = !this.showTos;
    console.log(this.showTos);
  }
}
