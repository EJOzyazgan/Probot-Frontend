import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['../auth.scss']
})
export class EmailVerificationComponent implements OnInit {
  email;
  token;
  isValid = false;
  validating = false;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.dataService.currentEmail.subscribe(email => this.email = email);

    this.validate();
  }

  validate() {
    if (this.token) {
      this.validating = true;
      this.authService.validateEmail(this.token).subscribe(valid => {
        this.isValid = true;
      }, err => {});
    }
  }

}
