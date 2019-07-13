import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {BotService} from '../../services/bot.service';
import {Bot} from '../../models/bot.model';
import * as moment from 'moment';
import {MetricService} from '../../services/metric.service';
import DurationConstructor = moment.unitOfTime.DurationConstructor;

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {
  @ViewChild('metricsChart') metricsChart;

  user = new User();
  bot = new Bot();

  isEditing = false;

  timePeriods = [
    ['1Day', 'day'],
    ['1Week', 'week'],
    ['1Month', 'month'],
    ['1Year', 'year'],
  ];

  metrics = [
    ['Hands Played', 'handPlayed'],
    ['Hands Won', 'handWon'],
    ['Total Winnings', 'totalWinnings']
  ];

  metricType = 'totalWinnings';
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
      animation: {
        startup: true,
        duration: 800,
        easing: 'out'
      }
    }
  };

  constructor(private authService: AuthService,
              private botService: BotService,
              private metricService: MetricService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user.bots.length > 0) {
        this.bot = this.user.bots[0];
        this.getMetrics();
      }
    });
  }

  getMetrics() {
    if (this.bot.id) {
      const body = {
        metricType: this.metricType,
        startTime: moment().subtract(1, this.metricTimePeriod).format(),
        endTime: moment().format()
      };

      this.metricService.getMetrics(body, this.bot.id).subscribe((metrics: Array<any>) => {
        this.updateMetricsChart(metrics);
      });
    }
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
      this.toggleEdit();
    });
  }

  formCompleted() {
    return this.bot.name === undefined || this.bot.serviceUrl === undefined;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updateMetricsChart(metrics) {
    const data = [];
    data.push(['Date', this.getTag()]);

    for (let i = 0; i < metrics.length; i++) {
      data.push([moment(metrics[i].createdAt).format('M-D-YY'), metrics[i].value]);
    }

    this.metricsData.dataTable = data;

    if (this.metricsChart.wrapper) {
      this.metricsChart.draw();
    }
  }

  getTag() {
    if (this.metricType === 'totalWinnings') {
      return 'Total Winnings';
    } else if (this.metricType === 'handWon') {
      return 'Hands Won';
    }
    return 'Hands Played';
  }

  mockData() {
    const start = moment().subtract(1, 'month');
    const end = moment();

    const data = [];
    data.push(['Date', this.getTag()]);

    while (start.diff(end) < 0) {
      data.push([start.format('M-D-YY'), 0]);
      start.add(1, 'day');
    }

    return data;
  }
}
