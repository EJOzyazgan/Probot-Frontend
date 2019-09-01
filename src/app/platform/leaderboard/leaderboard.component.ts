import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model';
import {MetricService} from '../../services/metric.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'class', 'rank'];
  dataSource = new MatTableDataSource();

  topPlayers: Array<User>;

  userOnPage = false;
  loaded = false;

  noLeaders  = false;

  user = new User();

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUserStanding();
  }

  getTopPlayers() {
    this.metricService.getTopPlayers().subscribe((topPlayers: Array<User>) => {
      this.topPlayers = topPlayers;
      if (this.topPlayers && this.topPlayers.length > 0) {
        this.populateLeaderboard();
      } else {
        this.noLeaders = true;
      }
    });
  }

  getUserStanding() {
    this.metricService.getUserStanding().subscribe((user: User) => {
      this.user = user;

      if (user) {
        this.getTopPlayers();
      }
    });
  }

  populateLeaderboard() {
    const topPlayers = [];
    for (let i = 0; i < this.topPlayers.length; i++) {
      topPlayers.push({
        icon: this.topPlayers[i].icon,
        username: this.topPlayers[i].username,
        rankClass: this.topPlayers[i].rankClass,
        rank: this.topPlayers[i].rank
      });
    }
    this.dataSource.data = topPlayers;
    this.isUserPage({pageIndex: 0, pageSize: 10});
  }

  isUserCellStyle(username) {
    let style = {};

    if (username === this.user.username) {
      style = {
        'background': 'rgba(204, 0, 0, 0.3)'
      };
    }

    return style;
  }

  isUserPage(event) {
    const pageRange = (event.pageIndex + 1) * event.pageSize;
    this.userOnPage = false;
    this.loaded = false;

    for (let i = event.pageIndex * event.pageSize; i < pageRange && i < this.topPlayers.length; i++) {
      if (this.user.username === this.topPlayers[i].username) {
        this.userOnPage = true;
        break;
      }
    }

    this.loaded = true;
  }
}
