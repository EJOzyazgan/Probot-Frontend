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

  botTypes = [
    ['Sandbox', 'sandbox'],
    ['PvP', 'pvp']
  ];

  displayedColumns: string[] = ['name', 'url', 'type', 'active'];
  dataSource = new MatTableDataSource();

  constructor(private botService: BotService) {
  }

  ngOnInit() {
    this.getBots();
  }

  getBots() {
    this.botService.getAdmin().subscribe((bots: Array<Bot>) => {
      this.bots = bots;
      this.dataSource.data = this.bots;
    });
  }

  createBot() {
    this.botService.create(this.bot).subscribe(bot => {
      this.bot = bot;
      this.bots.push(this.bot);
      this.dataSource.data = this.bots;
    });
  }

  patchBot() {
    this.botService.patchBot(this.bot).subscribe(patchedBot => {
      this.bot = patchedBot;
      this.toggleEdit();
    });
  }

  botSelected(bot) {
    this.bot = bot;
  }

  deselect() {
    this.bot = new Bot();
  }

  formCompleted() {
    return this.bot.name === undefined || this.bot.serviceUrl === undefined;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

}
