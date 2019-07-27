import {Component, OnInit} from '@angular/core';
import {Bot} from '../../models/bot.model';
import {BotService} from '../../services/bot.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-bots',
  templateUrl: './admin-bots.component.html',
  styleUrls: ['./admin-bots.component.scss',
    '../dashboard/dashboard.component.scss',
    '../bot/bot.component.scss'
  ]
})

export class AdminBotsComponent implements OnInit {
  bot = new Bot();
  bots: Array<Bot>;

  isEditing = false;

  displayedColumns: string[] = ['name', 'url', 'type', 'active'];
  dataSource = new MatTableDataSource();

  constructor(private botService: BotService) {
  }

  ngOnInit() {
  }

  createBot() {
    this.bot.userId = -1;
    this.botService.create(this.bot).subscribe(bot => {
      this.bot = bot;
    });
  }

  patchBot() {
    this.botService.patchBot(this.bot).subscribe(patchedBot => {
      this.bot = patchedBot;
      this.toggleEdit();
    });
  }

  populateBots() {
    const bots = [];
    for (let i = 0; i < this.bots.length; i++) {
      bots.push({
        url: this.bots[i].serviceUrl,
        name: this.bots[i].name,
        type: this.bots[i].botType,
        active: this.bots[i].isActive
      });
    }
    this.dataSource.data = bots;
  }

  formCompleted() {
    return this.bot.name === undefined || this.bot.serviceUrl === undefined;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

}
