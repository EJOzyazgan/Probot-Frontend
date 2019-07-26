import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editUsername = false;
  changePass = false;

  user = new User();

  tempUsername;
  tempPassword;
  confirmPassword;

  passRegEx = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])';

  passwordControl = new FormGroup({
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(this.passRegEx),
    ])
  });

  constructor(private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  validInput() {
    if (this.editUsername) {
      return this.tempUsername !== null && this.tempUsername.trim() !== '';
    } else if (this.changePass) {
      return this.tempPassword !== null &&
        this.tempPassword.trim() !== '' && this.tempPassword.length > 8 &&
        this.confirmPassword !== null && this.tempPassword.trim() === this.confirmPassword.trim();
    }
  }

  save() {
    if (this.tempUsername) {
      this.user.username = this.tempUsername;
    }

    if (this.tempPassword) {
      this.user.password = this.tempPassword;
    }


    this.authService.patchUser(this.user).subscribe(user => {
      this.user = user;
      this.reset('new');
      this.alertService.success('User updated');
    });
  }

  reset(field) {
    if (field === 'username') {
      this.editUsername = !this.editUsername;
      this.tempUsername = null;
    } else if (field === 'password') {
      this.changePass = !this.changePass;
      this.tempPassword = null;
      this.confirmPassword = null;
    } else if (field === 'new') {
      this.editUsername = false;
      this.changePass = false;
      this.tempUsername = null;
      this.tempPassword = null;
      this.confirmPassword = null;
    }
  }

  getErrorMessage() {
    return this.passwordControl.hasError('minLength') ? 'Must be at least 8 long' :
        this.passwordControl.hasError('pattern') ? 'Not a valid email' :
            '';
  }

}
