import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  email;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentEmail.subscribe(email => this.email = email);
  }

}
