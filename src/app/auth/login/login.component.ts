import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login-signup.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  disableLogin() {
    return !this.email || this.email.trim() === '' || !this.password || this.password.trim() === '';
  }

  login() {
    if (this.email === null || this.email.trim() === '' || this.email === undefined ||
      this.password === null || this.password.trim() === '' || this.password === undefined) {
      return this.alertService.warning('Please Fill In Email and Password');
    }

    this.authService.login(this.email, this.password).subscribe(tokens => {
      this.authService.setTokens(tokens);
      return this.router.navigate(['/platform']);
    }, err => {
      return this.alertService.danger(err['error']['msg']);
    });
  }

}
