import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model';
import {MetricService} from '../../services/metric.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'class', 'rank'];
  dataSource = new MatTableDataSource();

  topPlayers: Array<User>;

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getTopPlayers();
  }

  getTopPlayers() {
    this.metricService.getTopPlayers().subscribe((topPlayers: Array<User>) => {
      this.topPlayers = topPlayers;
      if (this.topPlayers) {
        this.populateLeaderboard();
      }
    });
  }

  populateLeaderboard() {
    const topPlayers = [];
    for (let i = 0; i < this.topPlayers.length; i++) {
      topPlayers.push({
        position: i + 1,
        icon: this.topPlayers[i].icon,
        name: this.topPlayers[i].username,
        class: this.topPlayers[i].rankClass,
        rank: this.topPlayers[i].rank
      });
    }
    this.dataSource.data = topPlayers;
  }

}
