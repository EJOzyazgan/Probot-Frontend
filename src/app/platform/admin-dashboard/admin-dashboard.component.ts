import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import DurationConstructor = moment.unitOfTime.DurationConstructor;
import {MetricService} from '../../services/metric.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss',
    '../dashboard/dashboard.component.scss',
    '../bot/bot.component.scss'
  ]
})

export class AdminDashboardComponent implements OnInit {
  @ViewChild('metricsChart', {static: false}) metricsChart;

  user = new User();

  handsPlayed;
  activeBots;
  activeTables;
  activeUsers;
  usersWhoReferred;
  referralsSent;
  referralsActivated;
  accountsCreated;
  accountsActivated;

  timePeriods = [
    ['1Day', 'day'],
    ['1Week', 'week'],
    ['1Month', 'month'],
    ['1Year', 'year'],
  ];

  metrics = [
    ['Platform Hands Played', 'platformHandPlayed'],
    ['Referral Rate', 'referralRate'],
    ['Referral Activation Rate', 'referralActivationRate'],
    ['Activation Rate', 'activationRate'],
    ['Active Bots', 'activeBots'],
    ['Active Tables', 'activeTables'],
  ];

  metricType = 'platformHandPlayed';
  metricTimePeriod: DurationConstructor = 'month';

  metricsData = {
    chartType: 'LineChart',
    dataTable: this.mockData(),
    options: {
      series: {
        0: {color: '#cc0000'}
      },
      legend: {position: 'none'},
      width: 1300,
      height: 730,
      hAxis: {
        showTextEvery: 2,
        slantedText: true,
      },
      chartArea: {
        width: '90%',
        height: '80%',
        right: 10,
      },
      animation: {
        startup: true,
        duration: 800,
        easing: 'out'
      }
    }
  };

  constructor(private router: Router,
              private authService: AuthService,
              private metricService: MetricService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (!this.user.isAdmin) {
        return this.router.navigate(['/auth/login']);
      }

      this.getAnalytics();
    });
  }

  getAnalytics() {
    this.metricService.getPlatformAnalytics().subscribe(platformAnalytics => {
      this.activeBots = platformAnalytics['activeBots'];
      this.activeTables = platformAnalytics['activeTables'];
      this.handsPlayed = platformAnalytics['platformHandsPlayed'];
    });

    this.metricService.getUserAnalytics().subscribe(userAnalytics => {
      this.activeUsers = userAnalytics['activeUsers'];
      this.usersWhoReferred = userAnalytics['usersWhoReferred'];
      this.referralsSent = userAnalytics['referralsSent'];
      this.referralsActivated = userAnalytics['referralsActivated'];
      this.accountsCreated = userAnalytics['accountsCreated'];
      this.accountsActivated = userAnalytics['accountsActivated'];
    });
  }

  getMetrics() {
    const body = {
      metricType: this.metricType,
      period: this.metricTimePeriod
    };

    this.metricService.getMetrics(body).subscribe((metrics: Array<any>) => {
      this.updateMetricsChart(metrics);
    });
  }

  updateMetricsChart(metrics) {
    const data = [];
    data.push(['Date', this.getTag()]);

    for (let i = 0; i < metrics.length; i++) {
      const date = moment(metrics[i].createdAt).format('M-D HH:mm');
      data.push([date, metrics[i].value]);
    }

    this.metricsData.dataTable = data;

    if (this.metricsChart.wrapper) {
      this.metricsChart.draw();
    }
  }

  getTag() {
    for (let i = 0; i < this.metrics.length; i++) {
      if (this.metricType === this.metrics[i][1]) {
        return this.metrics[i][0];
      }
    }
    return 'Value';
  }

  mockData() {
    const start = moment().subtract(1, 'month');
    const end = moment();

    const data = [];
    data.push(['Date', 'Platform Hands Played']);

    while (start.diff(end) < 0) {
      data.push([start.format('M-D-YY'), 0]);
      start.add(1, 'day');
    }

    return data;
  }
}
