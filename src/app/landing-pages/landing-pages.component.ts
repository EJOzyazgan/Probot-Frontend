import {Component, HostListener, OnInit} from '@angular/core';
import {GoogleAnalyticsService} from '../services/google-analytics.service';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss']
})
export class LandingPagesComponent implements OnInit {

  isScroll = false;

  days;
  hours;
  minutes;
  seconds;

  canSignup = false;

  constructor(private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  getCountdown() {
    // Update the count down every 1 second
    const this_ = this;
    setInterval(function () {
      // Get today's date and time
      const countDownDate = new Date("Aug 31, 2019 23:59:59").getTime();
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      this_.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this_.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this_.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this_.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text 
      this_.canSignup = distance < 0;
    }, 1000);
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
