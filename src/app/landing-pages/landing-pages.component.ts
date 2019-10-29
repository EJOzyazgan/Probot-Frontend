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

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.isScroll = true;
    } else {
        this.isScroll = false;
    }
  }

  navStyle() {
    if (!this.isScroll) {
      return {
        'background': 'transparent',
        'color': 'white',
      };
    } else {
      return {
        'background': '#F5F5F5',
      };
    }
  }

  SendSocialEvent(type) {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('SocialMedia', 'click', type, 1);
  }
}
