import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  user = new User();

  name;
  email;
  message;

  constructor(private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.email = this.user.email;
        this.name = this.user.username;
      }
    });
  }

  validForm() {
    return this.name && this.name.trim() !== '' &&
      this.email && this.email.trim() !== '' &&
      this.message && this.message.trim() !== '';
  }

  submit() {
    const body = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    this.authService.sendSupport(body).subscribe(email => {
      this.alertService.success(email['msg']);
      this.message = '';
    }, error => {
      this.alertService.danger(error['error']['error']['msg']);
    });
  }
}
