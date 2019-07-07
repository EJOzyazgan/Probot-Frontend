import {Component, OnInit} from '@angular/core';
import {BotService} from '../../services/bot.service';
import {TableService} from '../../services/table.service';
import {Bot} from '../../models/bot.model';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  bot = new Bot();

  constructor(private botService: BotService,
              private tableService: TableService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getBot();
  }

  startSandBox() {
    if (this.bot.id !== null) {
      const body = {
        bot: this.bot
      };
      this.tableService.startSandboxTable(body).subscribe(table => {
        this.alertService.success(table.msg);
      });
    }
  }

  getBot() {
    this.botService.getBotByUser().subscribe(bot => {
      if (bot) {
        this.bot = bot;
      }
    });
  }

}
