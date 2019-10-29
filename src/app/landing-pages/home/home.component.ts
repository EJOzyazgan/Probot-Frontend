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
      backgroundSize: 'contain',
    },
    {
      url: '../../../assets/img/referral-bonus.png',
      caption: 'Referral Bonus!',
      backgroundSize: 'contain',
    },
    {
      url: '../../../assets/img/signup-bonus.png',
      caption: 'Signup Bonus!',
      backgroundSize: 'contain',
    },
    {
      url: '../../../assets/img/social.png',
      caption: 'Social',
      backgroundSize: 'contain',
    }
  ];


  screenWidth;
  imgWidth = 800;
  imgHeight = '200';

  demoBotName = 'Demo Bot';
  botType = 1;

  constructor(public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
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
}
