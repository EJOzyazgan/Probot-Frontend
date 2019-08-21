import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {BotService} from '../../services/bot.service';
import {Bot} from '../../models/bot.model';
import * as moment from 'moment';
import {MetricService} from '../../services/metric.service';
import DurationConstructor = moment.unitOfTime.DurationConstructor;
import {AlertService} from 'ngx-alerts';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {
  @ViewChild('metricsChart', {static: false}) metricsChart;

  user = new User();
  bot = new Bot();

  isEditing = false;

  dataPeriods = [
    ['1Hour', 'hour', 1],
    ['3Hours', 'hour', 3],
    ['1Week', 'week', 1],
    ['1Month', 'month', 1],
    ['3Months', 'month', 3],
    ['1Year', 'year', 1],
  ];

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

  dataTimePeriod = -1;

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

  constructor(private authService: AuthService,
              private botService: BotService,
              private metricService: MetricService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user) {
        this.getBot();
      }
    });
  }

  getBot() {
    this.botService.getByUser().subscribe(bot => {
      if (bot) {
        this.bot = bot;
        this.getMetrics();
      }
    });
  }

  getMetrics() {
    if (this.bot.id) {
      const body = {
        botId: this.bot.id,
        metricType: this.metricType,
        period: this.metricTimePeriod
      };

      this.metricService.getMetrics(body).subscribe((metrics: Array<any>) => {
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
      const date = moment(metrics[i].createdAt).format(this.getFormat());
      data.push([date, metrics[i].value]);
    }

    this.metricsData.dataTable = data;

    if (this.metricsChart.wrapper) {
      this.metricsChart.draw();
    }
  }

  getFormat() {
    if (this.metricTimePeriod === 'day') {
      return 'hh:mm a';
    }
    return 'M-D-YY'
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
    data.push(['Date', this.getTag()]);

    while (start.diff(end) < 0) {
      data.push([start.format('M-D-YY'), 0]);
      start.add(1, 'day');
    }

    return data;
  }

  getDataCSV() {
    if (this.dataTimePeriod < 0) {
      return this.alertService.warning('Please select time period');
    } else if (!this.bot) {
      return this.alertService.warning('No data available');
    }

    const body = {
      botId: this.bot.id,
      timePeriod: this.dataPeriods[this.dataTimePeriod]
    };

    this.botService.getData(body).subscribe((data: Array<any>) => {
      if (data.length < 1) {
        return this.alertService.info(`No data for ${this.dataPeriods[this.dataTimePeriod][0]}`);
      }

      const blob: any = new Blob([JSON.stringify(data, null, 2)], {type: 'text/json; charset=utf-8'});
      fileSaver.saveAs(blob, 'data.json');
    }, err => {
      this.alertService.danger(err['error']['error']['msg']);
    });
  }
}
