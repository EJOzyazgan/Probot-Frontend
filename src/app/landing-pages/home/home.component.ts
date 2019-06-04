import {Component, OnInit} from '@angular/core';
import {GoogleAnalyticsService} from '../../services/google-analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  SendSocialEvent(type) {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('SocialMedia', 'click', type, 1);
  }
}
