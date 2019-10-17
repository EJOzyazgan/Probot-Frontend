import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../../services/table.service';
import { AlertService } from 'ngx-alerts';
import { Bot } from '../../models/bot.model';
import { BotService } from '../../services/bot.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Socket } from 'ngx-socket-io';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  bot = new Bot();
  user = new User();

  displayedColumns: string[] = ['type', 'start', 'end'];
  dataSource = new MatTableDataSource();

  session;

  table;

  tables = [
    {
      stakes: '1/2',
      smallBlind: 1,
      minBuyin: 100,
      maxBuyin: 400,
    }, {
      stakes: '2/4',
      smallBlind: 2,
      minBuyin: 200,
      maxBuyin: 800,
    }, {
      stakes: '5/10',
      smallBlind: 5,
      minBuyin: 500,
      maxBuyin: 2000,
    }, {
      stakes: '10/20',
      smallBlind: 10,
      minBuyin: 1000,
      maxBuyin: 4000,
    }, {
      stakes: '25/50',
      smallBlind: 25,
      minBuyin: 2500,
      maxBuyin: 10000,
    }, {
      stakes: '50/100',
      smallBlind: 50,
      minBuyin: 5000,
      maxBuyin: 20000,
    }, {
      stakes: '100/200',
      smallBlind: 100,
      minBuyin: 10000,
      maxBuyin: 40000,
    }, {
      stakes: '200/400',
      smallBlind: 200,
      minBuyin: 20000,
      maxBuyin: 80000,
    }, {
      stakes: '500/1K',
      smallBlind: 500,
      minBuyin: 50000,
      maxBuyin: 2000000,
    }, {
      stakes: '1K/2K',
      smallBlind: 1000,
      minBuyin: 100000,
      maxBuyin: 400000,
    }, {
      stakes: '2K/4K',
      smallBlind: 2000,
      minBuyin: 200000,
      maxBuyin: 800000,
    }, {
      stakes: '5K/10K',
      smallBlind: 5000,
      minBuyin: 500000,
      maxBuyin: 1500000,
    }, {
      stakes: '10K/20K',
      smallBlind: 10000,
      minBuyin: 1000000,
      maxBuyin: 3000000,
    }, {
      stakes: '20K/40K',
      smallBlind: 20000,
      minBuyin: 2000000,
      maxBuyin: 6000000,
    }, {
      stakes: '50K/100K',
      smallBlind: 50000,
      minBuyin: 5000000,
      maxBuyin: 15000000,
    }, {
      stakes: '100K/200K',
      smallBlind: 100000,
      minBuyin: 10000000,
      maxBuyin: 40000000,
    }, {
      stakes: '250K/500K',
      smallBlind: 250000,
      minBuyin: 25000000,
      maxBuyin: 100000000,
    }, {
      stakes: '500K/1M',
      smallBlind: 500000,
      minBuyin: 50000000,
      maxBuyin: 200000000,
    }
  ];

  buyinControl = new FormControl('', Validators.compose(
    [Validators.required, Validators.min(100), Validators.max(400)]
  ));

  checkingSandbox = false;

  checkingBot = false;
  botConnected = false;
  botMessage;

  checkingGame = false;
  gameCompleted = false;
  gameMessage;

  pvpMessage;

  gameData;

  showNotMobile = false;
  loaded = false;

  constructor(private botService: BotService,
    private authService: AuthService,
    private tableService: TableService,
    private alertService: AlertService,
    private socket: Socket,
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.showNotMobile = window.innerWidth < 1200;

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
    const body = {
      bot: this.bot,
      table: this.table,
      buyin: this.buyinControl.value,
    };

    this.tableService.joinTable(body).subscribe(res => {
      this.alertService.success(res['msg']);
    }, error => {
      this.alertService.danger(error.error.msg);
    });
  }

  inputsReady() {
    if (this.bot.id && this.buyinControl.valid && this.table) {
      if (this.buyinControl.value > this.user.chips) {
        this.pvpMessage = true;
        return false;
      } else {
        this.pvpMessage = false;
      }
      return true;
    }
    return false;
  }

  tableSelect() {
    this.buyinControl = new FormControl('', Validators.compose(
      [Validators.required, Validators.min(this.table.minBuyin), Validators.max(this.table.maxBuyin)]
    ));

    let defaultBuyin = (this.table.maxBuyin + this.table.minBuyin) / 2;
    this.buyinControl.setValue(defaultBuyin < this.user.chips ? defaultBuyin : this.user.chips);
  }

  sessionSelected(session) {
    this.session = session;
  }

  watchGame() {
    this.botService.getData(this.session).subscribe((data: Array<JSON>) => {
      this.dataService.changeGameData(data);
      this.router.navigate(['./game-view']);
    }, err => {
      this.alertService.danger(err['error']['error']['msg']);
    });
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
        this.getSessions();
      }
    });
  }

  getSessions() {
    this.botService.getSessions(this.bot.id).subscribe((sessions: Array<Session>) => {
      if (sessions) {
        this.dataSource.data = sessions;
        this.loaded = true;
      }
    })
  }
}
