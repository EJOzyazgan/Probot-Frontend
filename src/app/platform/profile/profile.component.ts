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
  changePass = true;

  user = new User();

  tempUsername;
  tempPassword;
  confirmPassword;

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

  setValue(value, field) {
    switch (field) {
      case 'tempPass':
        this.tempPassword = value;
        break;
      case 'confirmPass':
        this.confirmPassword = value;
        break;
    }
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
}
