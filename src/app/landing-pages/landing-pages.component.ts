import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss']
})
export class LandingPagesComponent implements OnInit {

  isScroll = false;

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScroll = number > 75;

  }

  navStyle() {
    if (!this.isScroll) {
      return {
        'background': 'transparent'
      };
    } else {
      return {
        'background': '#f6f6f6'
      };
    }
  }
}
