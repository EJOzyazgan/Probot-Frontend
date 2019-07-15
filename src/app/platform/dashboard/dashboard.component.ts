import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Bot} from '../../models/bot.model';
import * as moment from 'moment';
import {MetricService} from '../../services/metric.service';


export interface PeriodicElement {
  name: string;
  pic: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, pic: '../../assets/award.svg', name: 'John', weight: 2817},
  {position: 2, pic: '../../assets/award.svg', name: 'Sam', weight: 3819},
  {position: 3, pic: '../../assets/award.svg', name: 'Billy', weight: 6937},
  {position: 4, pic: '../../assets/award.svg', name: 'Tony', weight: 8371},
  {position: 5, pic: '../../assets/award.svg', name: 'EJ', weight: 8792},
  {position: 6, pic: '../../assets/award.svg', name: 'Sarah', weight: 9472},
  {position: 7, pic: '../../assets/award.svg', name: 'Mark', weight: 10238},
  {position: 8, pic: '../../assets/award.svg', name: 'Emma', weight: 10782}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @ViewChild('totalWinningsChart') totalWinningsChart;

  user = new User();
  bot = new Bot();

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

  displayedColumns: string[] = ['position', 'name', 'rank'];
  dataSource = ELEMENT_DATA;

  constructor(private authService: AuthService,
              private metricService: MetricService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;

      if (this.user.bots[0]) {
        this.bot = this.user.bots[0];
        this.getTotalWinnings();
      }

      this.user.lastLoggedIn = moment.utc().toDate();

      this.authService.patchUser(this.user).subscribe(patchedUser => {
        this.user = patchedUser;
      });
    });
  }

  getTotalWinnings() {
    const body = {
      metricType: 'totalWinnings',
      startTime: moment().subtract(1, 'month').format(),
      endTime: moment().format()
    };

    this.metricService.getMetrics(body, this.bot.id).subscribe((metrics: Array<any>) => {
      for (let i = 0; i < metrics.length; i++) {
        this.totalWinningsData.dataTable[i + 1][1] = metrics[i].value;
      }

      if (this.totalWinningsChart.wrapper) {
        this.totalWinningsChart.draw();
      }
    });
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
}
