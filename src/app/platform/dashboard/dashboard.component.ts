import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Bot} from '../../models/bot.model';
import * as moment from 'moment';
import {MetricService} from '../../services/metric.service';
import {AlertService} from 'ngx-alerts';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @ViewChild('totalWinningsChart', {static: false}) totalWinningsChart;

  user = new User();
  bot = new Bot();

  dailyRewardView = false;
  referralView = false;
  addFriendView = false;

  friendsEmail = null;

  rewards = [500, 1000, 1750, 3000, 5000];
  friends: Array<User>;

  totalWinningsData = {
    chartType: 'LineChart',
    dataTable: this.mockData(),
    options: {
      series: {
        0: {color: '#cc0000'}
      },
      legend: {position: 'none'},
      width: 950,
      height: 325,
      animation: {
        startup: true,
        duration: 800,
        easing: 'out'
      }
    }
  };

  displayedColumns: string[] = ['position', 'name', 'class', 'rank'];
  dataSource = new MatTableDataSource();

  MINUTE_DAY = 1440;

  constructor(private authService: AuthService,
              private metricService: MetricService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user.isAdmin) {
        return this.router.navigate(['platform/admin-dashboard']);
      }

      if (this.user.friends.length > 0) {
        this.getFriends();
      }

      if (this.user.bots[0]) {
        this.bot = this.user.bots[0];
        this.getTotalWinnings();
      }

      if (!this.user.firstLoggedIn ||
        (moment(this.user.firstLoggedIn).diff(moment(), 'minutes') < -this.MINUTE_DAY &&
          moment(this.user.firstLoggedIn).diff(moment(), 'minutes') > -(2 * this.MINUTE_DAY))) {
        this.user.daysLoggedIn++;
        this.user.firstLoggedIn = moment().toDate();
        this.dailyRewardView = true;
      } else if (moment(this.user.firstLoggedIn).diff(moment(), 'minutes') <= -(2 * this.MINUTE_DAY)) {
        this.user.daysLoggedIn = 1;
        this.user.firstLoggedIn = moment().toDate();
        this.dailyRewardView = true;
      }

      this.user.lastLoggedIn = moment().toDate();

      this.authService.patchUser(this.user).subscribe(patchedUser => {
        this.user = patchedUser;
      });
    });
  }

  getTotalWinnings() {
    const body = {
      metricType: 'totalWinnings',
      period: 'month'
    };

    this.metricService.getMetrics(body, this.bot.id).subscribe((metrics: Array<any>) => {
      this.updateMetricsChart(metrics);
    });
  }

  updateMetricsChart(metrics) {
    const data = [];
    data.push(['Date', 'Total Winnings']);

    for (let i = 0; i < metrics.length; i++) {
      const date = moment(metrics[i].createdAt).format('M-D HH:mm');
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
      this.friends = friends['friends'];
      this.populateFriends();
    });
  }

  populateFriends() {
    const friends = [];
    for (let i = 0; i < this.friends.length; i++) {
      friends.push({
        position: i + 1,
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
    data.push(['Date', 'Winnings']);

    while (start.diff(end) < 0) {
      data.push([start.format('M-D-YY'), 0]);
      start.add(1, 'day');
    }

    return data;
  }

  getRewardStyle(reward) {
    let style;

    if (this.user.daysLoggedIn > reward && (reward < 5)) {
      style = {
        'background': '#cc0000',
        'color': 'white',
        'pointer-events': 'none'
      };
    } else if (this.user.daysLoggedIn < reward) {
      style = {
        'background': '#C1C1C1',
        'color': 'black',
        'pointer-events': 'none'
      };
    }

    return style;
  }

  getReward(reward) {
    this.user.chips += this.rewards[reward];
    this.authService.patchUser(this.user).subscribe(updatedUser => {
      if (updatedUser) {
        this.user = updatedUser;
      }
    });

    this.toggleView('rewards');
  }

  referFriend() {
    if (this.friendsEmail !== null && this.friendsEmail.trim() !== '') {
      this.authService.sendReferralEmail(this.friendsEmail).subscribe(email => {
        this.alertService.success(email['msg']);
        this.toggleView('refer');
      }, err => {
        this.alertService.danger(err['error']['error']['msg']);
        this.toggleView('refer');
      });
    } else {
      this.alertService.warning('Must provide friend\'s email');
    }
  }

  addFriend() {
    this.authService.addFriend(this.friendsEmail).subscribe(email => {
      this.alertService.success(email['msg']);
      this.toggleView('invite');
    });
  }

  toggleView(view) {
    if (view === 'rewards') {
      this.dailyRewardView = !this.dailyRewardView;
    } else if (view === 'refer') {
      this.referralView = !this.referralView;
    } else if (view === 'invite') {
      this.addFriendView = !this.addFriendView;
    }
  }
}
