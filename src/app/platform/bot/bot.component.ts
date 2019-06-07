import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {BotService} from '../../services/bot.service';
import {Bot} from '../../models/bot.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  user = new User();
  bot = new Bot();

  isEditing = false;

  timePeriods = ['Today', 'Last Week', 'Last Month', 'All Time', 'Custom'];

  metrics = ['Hands Played', 'Total Winnings'];

   myData = [
    ['5-25-19', {v: 0, f: '0'}],
    ['5-26-19', {v: 0, f: '0'}],
    ['5-27-19', {v: 0, f: '0'}],
    ['5-28-19', {v: 0, f: '0'}],
    ['5-29-19', {v: 0, f: '0'}],
    ['5-30-19', {v: 0, f: '0'}],
    ['5-31-19', {v: 0, f: '0'}],
    ['6-1-19', {v: 0, f: '0'}],
    ['6-2-19', {v: 0, f: '0'}],
    ['6-3-19', {v: 0, f: '0'}],
    ['6-4-19', {v: 0, f: '0'}],
    ['6-5-19', {v: 0, f: '0'}],
    ['6-6-19', {v: 0, f: '0'}]
  ];

  myColumnNames = ['Date', 'Winnings'];

  myOptions = {
    legend: {position: 'none'},
    width: 1300,
    height: 730
  };

  constructor(private authService: AuthService, private botService: BotService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user.bots.length > 0) {
        this.bot = this.user.bots[0];
      }
    });
  }

  createBot() {
    this.bot.userId = this.user.id;
    this.botService.create(this.bot).subscribe(bot => {
      this.bot = bot;
    });
  }

  patchBot() {
    this.botService.patchBot(this.bot).subscribe(patchedBot => {
      this.bot = patchedBot;
    });
  }

  formCompleted() {
    return this.bot.name === undefined || this.bot.serviceUrl === undefined;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
