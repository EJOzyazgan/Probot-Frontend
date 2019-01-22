import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {Router} from '@angular/router';

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
    if (this.email === null || this.email === '' ||
      this.password === null || this.password === '') {
      return this.alertService.warning('Please Fill In Email and Password');
    }

    this.authService.login(this.email, this.password).subscribe(user => {
      localStorage.setItem('token', user['user'].token);
      localStorage.setItem('userId', user['user']._id);
      return this.router.navigate(['/profile/overview']);
    });
  }

}
