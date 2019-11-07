import { Component, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { IImage } from 'ng-simple-slideshow';
import { style } from '@angular/animations';
import { GameTableComponent } from 'src/app/game-table/game-table.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(GameTableComponent, {static: false}) gameTable:GameTableComponent;

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
  botType = "0";

  selectedTab = 0;
  titles = ['Demo Bot', 'Demo Code'];

  passiveCode = 
  `def bet(game_state):
    gs = game_state['state']
    p = gs['players']
    me = p[gs['me']]

    if me['chips'] * 0.2 <=
    gs['callAmount']:
        return
        {'bet': gs['callAmount']}
    return
    {'bet': me['chips'] * 0.2}`

  safeCode = 
  `def bet(game_state):
    gs = game_state['state']
    p = gs['players']
    me = p[gs['me']]

    if me['chips'] > gs['callAmount']:
        return {'bet': gs['callAmount']}
    return {'bet': 0}`

  aggresiveCode = 
  `def bet(game_state):
  gs = game_state['state']
  p = gs['players']
  me = p[gs['me']]

  rank = 0

  if me['cards'][0]['rank'] == '8':
      rank += 8
  elif me['cards'][0]['rank'] == '9':
      rank += 9
  elif me['cards'][0]['rank'] == '10':
      rank += 10
  elif me['cards'][0]['rank'] == 'J':
      rank += 11
  elif me['cards'][0]['rank'] == 'Q':
      rank += 12
  elif me['cards'][0]['rank'] == 'K':
      rank += 13
  elif me['cards'][0]['rank'] == 'A':
      rank += 14

  if me['cards'][1]['rank'] == '8':
      rank += 8
  elif me['cards'][1]['rank'] == '9':
      rank += 9
  elif me['cards'][1]['rank'] == '10':
      rank += 10
  elif me['cards'][1]['rank'] == 'J':
      rank += 11
  elif me['cards'][1]['rank'] == 'Q':
      rank += 12
  elif me['cards'][1]['rank'] == 'K':
      rank += 13
  elif me['cards'][1]['rank'] == 'A':
      rank += 14

  myBet = gs['minimumRaiseAmount']

  if rank >= 24 and me['chips'] >=
  gs['minimumRaiseAmount'] * 2:
      myBet = gs['minimumRaiseAmount'] * 2
  elif rank >= 20 and me['chips'] >=
  gs['minimumRaiseAmount'] * 1.5:
      myBet = gs['minimumRaiseAmount'] * 1.5

  return {'bet': myBet}`

  demoCode = [this.safeCode, this.passiveCode, this.aggresiveCode];
  
  constructor(public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  selectedTabStyle(tab) {
    let style = {};

    if (tab === this.selectedTab) {
      style = {
        'border-bottom': '3px solid #cc0000'
      }
    }

    return style
  }

  startDemo() {
    this.gameTable.startDemo();
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
