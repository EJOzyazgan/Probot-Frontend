import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { BotService } from '../../services/bot.service';
import { Bot } from '../../models/bot.model';
import * as moment from 'moment';
import { MetricService } from '../../services/metric.service';
import DurationConstructor = moment.unitOfTime.DurationConstructor;
import { AlertService } from 'ngx-alerts';
import * as fileSaver from 'file-saver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {
  @ViewChild('metricsChart', { static: false }) metricsChart;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  user = new User();
  bot = new Bot();

  isEditing = false;

  displayedColumns: string[] = ['type', 'start', 'end'];
  dataSource = new MatTableDataSource();

  session;

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
        0: { color: '#cc0000' }
      },
      legend: { position: 'none' },
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

  showNotMobile = false;

  constructor(private authService: AuthService,
    private botService: BotService,
    private metricService: MetricService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUser();

    if (window.innerWidth < 1800) {
      this.metricsData.options.width = (window.innerWidth * 0.85);
    } else {
      this.metricsData.options.width = (window.innerWidth * 0.7);
    }

    this.showNotMobile = window.innerWidth < 600;
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
        this.getSessions();
      }
    });
  }

  getSessions() {
    this.botService.getSessions(this.bot.id).subscribe((sessions: Array<Session>) => {
      if (sessions) {
        this.dataSource.data = sessions;
      }
    })
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
    this.addEnd();
    this.botService.create(this.bot).subscribe(bot => {
      this.bot = bot;
    });
  }

  patchBot() {
    this.bot.serviceUrl = this.bot.serviceUrl.trim();
    this.botService.patchBot(this.bot).subscribe(patchedBot => {
      this.bot = patchedBot;
      this.toggleEdit();
    });
  }

  sessionSelected(session) {
    this.session = session;
  }

  formCompleted() {
    return this.bot.name === undefined || this.bot.serviceUrl === undefined ||
      !this.validURL(this.bot.serviceUrl);
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
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
    this.botService.getCleanData(this.session).subscribe((data: Array<any>) => {
      try {
        const blob: any = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json; charset=utf-8' });
        const date = moment(this.session.createdAt).format('YY-M-D_HH-mm')
        fileSaver.saveAs(blob, `${this.bot.name}-data-${date}.json`);
      } catch (err) {
      
      }
    }, err => {
      this.alertService.danger(err['error']['error']['msg']);
    });
  }
}
