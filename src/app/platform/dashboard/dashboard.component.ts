import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Bot} from '../../models/bot.model';
import * as moment from 'moment';
import {BotService} from '../../services/bot.service';


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

  user = new User();
  bot = new Bot();

  myData = [
    ['London', {v: 8136000, f: '8,1360'}],
    ['New York', {v: 8538000, f: '8,530'}]
  ];

  myColumnNames = ['City', 'Inhabitants'];

  myOptions = {
    legend: {position: 'none'},
    width: 950,
    height: 325
  };

  displayedColumns: string[] = ['position', 'name', 'rank'];
  dataSource = ELEMENT_DATA;

  constructor(private authService: AuthService, private botService: BotService) {
  }

  ngOnInit() {
    this.getUser();
    this.getBot();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.user.lastLoggedIn = moment.utc().toDate();

      this.authService.patchUser(this.user).subscribe(patchedUser => {
        this.user = patchedUser;
      });
    });
  }

  getBot() {
    this.botService.getBotByUser().subscribe(bot => {
      if (bot) {
        this.bot = bot;
      }
    });
  }

}
