import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  disableLogin = false;
  email;
  password;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.disableLogin = true;
    if (this.email === null || this.email === '' || this.email === undefined ||
      this.password === null || this.password === '' || this.password === undefined) {
      this.disableLogin = false;
      return this.alertService.warning('Please Fill In Email and Password');
    }

    this.authService.login(this.email, this.password).subscribe(user => {
      localStorage.setItem(environment.userTokenKey, user['token']);
      return this.router.navigate(['/platform']);
    }, err => {
      this.disableLogin = false;
      console.log(err);
      return this.alertService.danger(err['error']['msg']);
    });
  }

}
