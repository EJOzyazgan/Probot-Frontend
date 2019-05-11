import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  timePeriods = ['Today', 'Last Week', 'Last Month', 'All Time', 'Custom'];

  metrics = ['Hands Played', 'Total Winnings'];

  myData = [
    ['London', {v: 8136000, f: '8,1360'}],
    ['New York', {v: 8538000, f: '8,530'}]
  ];

  myColumnNames = ['City', 'Inhabitants'];

  myOptions = {
    legend: {position: 'none'},
    width: 1300,
    height: 730
  };

  constructor() {
  }

  ngOnInit() {
  }

}
