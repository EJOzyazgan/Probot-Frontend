import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { AlertService } from 'ngx-alerts';
import { Bot } from '../../models/bot.model';
import { BotService } from '../../services/bot.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  bot = new Bot();
  user = new User();

  buyin;

  buyins = [100, 200, 300, 400, 500];

  checkingSandbox = false;

  checkingBot = false;
  botConnected = false;
  botMessage;

  checkingGame = false;
  gameCompleted = false;
  gameMessage;

  constructor(private botService: BotService,
    private authService: AuthService,
    private tableService: TableService,
    private alertService: AlertService,
    private socket: Socket) {
  }

  ngOnInit() {
    this.socket.on('connect', (data) => {
    });

    this.socket.on('sandboxUpdate', data => {
      if (data.botConnected !== null && data.botConnected !== undefined) {
        this.checkingBot = false;
        this.botConnected = data.botConnected;
        this.botMessage = data.botMessage;
      }

      if (data.gameCompleted !== null && data.gameCompleted !== undefined) {
        this.checkingGame = false;
        this.gameCompleted = data.gameCompleted;
        this.gameMessage = data.gameMessage;
      }
    });

    this.getUser();
    this.getBot();
  }

  startSandBox() {
    if (this.bot.id !== null) {
      this.checkingGame = true;
      this.checkingBot = true;
      this.botMessage = null;
      this.gameMessage = null;
      this.tableService.startSandboxTable(this.bot).subscribe(res => {
        this.checkingSandbox = true;
        this.alertService.success(res['msg']);
      }, error => {
        this.alertService.danger(error.error.msg);
        this.checkingGame = false;
        this.checkingBot = false;
      });
    }
  }

  startPVP() {
    if (this.buyin && this.user.id !== null && this.bot.id !== null) {
      if (this.buyin > this.user.chips) {
        return this.alertService.warning('Not enough chips');
      }

      const body = {
        bot: this.bot,
        buyin: this.buyin
      };

      this.tableService.joinTable(body).subscribe(res => {
        this.alertService.success(res['msg']);
      }, error => {
        this.alertService.danger(error.error.msg);
      });
    } else {
      this.alertService.warning('Please Select Buy In');
    }

  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  getBot() {
    this.botService.getByUser().subscribe(bot => {
      if (bot) {
        this.bot = bot;
        this.socket.emit('room', `${this.bot.id}-sandbox`);
      }
    });
  }
}
