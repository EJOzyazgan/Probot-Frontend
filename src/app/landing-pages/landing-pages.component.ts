import {Component, HostListener, OnInit} from '@angular/core';
import {GoogleAnalyticsService} from '../services/google-analytics.service';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss']
})
export class LandingPagesComponent implements OnInit {

  isScroll = false;

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  navStyle() {
    if (!this.isScroll) {
      return {
        'background': 'transparent'
      };
    } else {
      return {
        'background': '#f6f6f6',
        'box-shadow': '0 0 15px 1px #cc0000'
      };
    }
  }

  SendSocialEvent(type) {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('SocialMedia', 'click', type, 1);
  }
}
