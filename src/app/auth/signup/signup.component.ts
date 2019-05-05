import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = new User(null);
  disableSignup = false;
  tempPassword = '';
  agreeTos = true;
  show = false;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {

  }

  signUp() {
    this.disableSignup = true;
    if (this.user.email !== null && this.user.email !== '' &&
      this.user.password !== null && this.user.password !== '' &&
      this.user.name !== null && this.user.name !== '' &&
      this.tempPassword !== null && this.tempPassword !== '' &&
      this.agreeTos) {


      if (this.user.password !== this.tempPassword) {
        return this.alertService.warning('Passwords Do Not Match');
      } else if (this.user.password.length < 8) {
        return this.alertService.warning('Password must be at least 8 characters long');
      }
      this.authService.checkExists(this.user.email).subscribe(user => {
        if (user[0]) {
          return this.alertService.warning('User with this email exists');
        }

        this.authService.signUp(this.user).subscribe(() => {
          this.alertService.success('Sign Up Successful');
          this.authService.login(this.user.email, this.user.password).subscribe((currentUser) => {
            return this.router.navigate(['/game-view']);
          });
        });
      });
    } else {
      this.disableSignup = false;
      this.alertService.warning('Please Fill In All Fields');
    }
  }
}
