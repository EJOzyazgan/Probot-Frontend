import { Component, OnInit, HostListener } from '@angular/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageUrls: (string | IImage)[] = [
    {
      url: '../../../assets/img/next-gen-gaming.png',
      caption: 'Next Generation Gaming',
    },
    {
      url: '../../../assets/img/referral-bonus.png',
      caption: 'Referral Bonus!',
    },
    {
      url: '../../../assets/img/signup-bonus.png',
      caption: 'Signup Bonus!'
    }
  ];

  canSignup = false;
  countLoaded = false;

  tableMessage = 'Tables Live In...';

  days;
  hours;
  minutes;
  seconds;

  screenWidth;
  imgWidth = 800;
  imgHeight = '200';


  constructor(public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
    this.getCountdown();
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  getSlideshowHeight() {
    let style;

    if (this.screenWidth < 500) {
      style = {
        'height': '200px'
      };
    } else {
      style = {
        'height': '500px'
      };
    }

    return style;
  }

  SendSocialEvent(type) {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('SocialMedia', 'click', type, 1);
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
      this_.countLoaded = true;

      if (this_.canSignup) {
        this_.tableMessage = 'Tables Now Live!!!';
      }
    }, 1000);
  }
}
