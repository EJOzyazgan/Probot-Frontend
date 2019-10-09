import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Bot } from '../../models/bot.model';
import * as moment from 'moment';
import { MetricService } from '../../services/metric.service';
import { AlertService } from 'ngx-alerts';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BotService } from '../../services/bot.service';
import { FriendDialogComponent } from 'src/app/shared/dialogs/friend-dialog/friend-dialog.component';
import { MatDialog } from '@angular/material';
import { RefferalDialogComponent } from 'src/app/shared/dialogs/refferal-dialog/refferal-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @ViewChild('totalWinningsChart', { static: false }) totalWinningsChart;

  user = new User();
  bot = new Bot();

  dailyRewardView = false;
  referralView = false;
  addFriendView = false;

  friendsEmail = null;

  rewardChips = 30000;

  rewards = [500, 1000, 1500, 2000, 2500];
  dailyReward = 500;
  friends: Array<User>;

  totalWinningsData = {
    chartType: 'LineChart',
    dataTable: this.mockData(),
    options: {
      series: {
        0: { color: '#cc0000' }
      },
      hAxis: {
        showTextEvery: 2,
        slantedText: true,
      },
      legend: { position: 'none' },
      width: 1000,
      height: 325,
      chartArea: {
        width: '90%',
        height: '70%',
        right: 5,
      },
      animation: {
        startup: true,
        duration: 800,
        easing: 'out'
      }
    }
  };

  displayedColumns: string[] = ['name', 'class', 'rank'];
  dataSource = new MatTableDataSource();

  MINUTE_DAY = 1440;

  constructor(private authService: AuthService,
    private metricService: MetricService,
    private alertService: AlertService,
    private router: Router,
    private botService: BotService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUser();

    if (window.innerWidth < 400) {
      this.totalWinningsData.options.width = (window.innerWidth * 0.70);
    } else if (window.innerWidth < 1100) {
      this.totalWinningsData.options.width = (window.innerWidth * 0.80);
    }
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user) {
        this.getBot();
      }

      if (this.user.isAdmin) {
        return this.router.navigate(['platform/admin-dashboard']);
      }

      if (this.user.friends.length > 0) {
        this.getFriends();
      }

      if (!this.user.firstLoggedIn ||
        (moment(this.user.firstLoggedIn).diff(moment(), 'minutes') < -this.MINUTE_DAY &&
          moment(this.user.firstLoggedIn).diff(moment(), 'minutes') > -(2 * this.MINUTE_DAY))) {
        this.user.daysLoggedIn++;
        this.user.firstLoggedIn = moment().toDate();

        if (this.user.daysLoggedIn < 5) {
          this.getReward(this.user.daysLoggedIn-1);
        } else {
          this.getReward(4);
        }
      } else if (moment(this.user.firstLoggedIn).diff(moment(), 'minutes') <= -(2 * this.MINUTE_DAY)) {
        this.user.daysLoggedIn = 1;
        this.user.firstLoggedIn = moment().toDate();
        this.getReward(this.user.daysLoggedIn-1);
      }

      this.user.lastLoggedIn = moment().toDate();

      this.authService.patchUser(this.user).subscribe(patchedUser => {
        this.user = patchedUser;
      });
    });
  }

  getTotalWinnings() {
    const body = {
      botId: this.bot.id,
      metricType: 'totalWinnings',
      period: 'month'
    };

    this.metricService.getMetrics(body).subscribe((metrics: Array<any>) => {
      this.updateMetricsChart(metrics);
    });
  }

  updateMetricsChart(metrics) {
    const data = [];
    data.push(['Date', 'Total Winnings']);

    for (let i = 0; i < metrics.length; i++) {
      const date = moment(metrics[i].createdAt).format('M-D-YY');
      data.push([date, metrics[i].value]);
    }

    this.totalWinningsData.dataTable = data;

    if (this.totalWinningsChart.wrapper) {
      this.totalWinningsChart.draw();
    }
  }

  getFriends() {
    const friendIds = this.user.friends.map(f => f.friendId);

    this.authService.getFriends(friendIds).subscribe((friends: Array<User>) => {
      this.friends = friends;
      this.populateFriends();
    });
  }

  getBot() {
    this.botService.getByUser().subscribe(bot => {
      if (bot) {
        this.bot = bot;
        this.getTotalWinnings();
      }
    });
  }

  populateFriends() {
    const friends = [];
    for (let i = 0; i < this.friends.length; i++) {
      friends.push({
        icon: this.friends[i].icon,
        name: this.friends[i].username,
        class: this.friends[i].rankClass,
        rank: this.friends[i].rank
      });
    }
    this.dataSource.data = friends;
  }

  mockData() {
    const start = moment().subtract(1, 'month');
    const end = moment();

    const data = [];
    data.push(['Date', 'Total Winnings']);

    while (start.diff(end) < 0) {
      data.push([start.format('M-D-YY'), 0]);
      start.add(1, 'day');
    }

    return data;
  }

  getRewardStyle(reward) {
    let style;

    if (this.user.daysLoggedIn >= reward) {
      style = {
        'background': '#cc0000',
        'color': 'white',
        'pointer-events': 'none'
      };
    } else {
      style = {
        'background': '#C1C1C1',
        'color': 'black',
        'pointer-events': 'none'
      };
    }

    return style;
  }

  getReward(reward) {
    this.dailyReward = this.rewards[reward];
    this.user.chips += this.dailyReward;
    this.authService.patchUser(this.user).subscribe(updatedUser => {
      if (updatedUser) {
        this.user = updatedUser;
      }
    });

    this.toggleView('rewards');
  }

  toggleView(view) {
    if (view === 'rewards') {
      this.dailyRewardView = !this.dailyRewardView;
    } else if (view === 'refer') {
      const dialogRef = this.dialog.open(RefferalDialogComponent, {
        width: '250px',
        data: { chips: this.rewardChips },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.sendReferralEmail(result).subscribe(email => {
            this.alertService.success(email['msg']);
          }, err => {
            this.alertService.danger(err['error']['error']['msg']);
          });
        }
      });
    } else if (view === 'invite') {
      const dialogRef = this.dialog.open(FriendDialogComponent, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.addFriend(result).subscribe(email => {
            this.alertService.success(email['msg']);
          }, err => {
            this.alertService.danger(err['error']['error']['msg'])
          });
        }
      });
    }
  }
}
