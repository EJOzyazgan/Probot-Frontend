import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = new User(null);
  disableSignup = false;
  confirmPassword = '';
  agreeTos = true;

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
      this.confirmPassword !== null && this.confirmPassword !== '' &&
      this.agreeTos) {


      if (this.user.password !== this.confirmPassword) {
        this.disableSignup = false;
        return this.alertService.warning('Passwords Do Not Match');
      } else if (this.user.password.length < 8) {
        this.disableSignup = false;
        return this.alertService.warning('Password must be at least 8 characters long');
      }
      this.authService.checkExists(this.user.email).subscribe(user => {
        if (user[0]) {
          this.disableSignup = false;
          return this.alertService.warning('User with this email exists');
        }

        this.authService.signUp(this.user).subscribe(() => {
          this.alertService.success('Sign Up Successful');
          this.authService.login(this.user.email, this.user.password).subscribe(currentUser => {
            localStorage.setItem(environment.userTokenKey, currentUser['user'].token);
            localStorage.setItem(environment.userIdKey, currentUser['user'].id);
            return this.router.navigate(['/platform']);
          });
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
}
