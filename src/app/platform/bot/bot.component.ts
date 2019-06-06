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
    ['London', {v: 8136000, f: '8,1360'}],
    ['New York', {v: 8538000, f: '8,530'}]
  ];

  myColumnNames = ['City', 'Inhabitants'];

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
