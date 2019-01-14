import {Component, OnInit, isDevMode} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {
  players = [];
  commonCards = [];
  data;
  pot = 0;

  playerPos = [{top: 15, left: 5},
    {top: 60, left: 5},
    {top: 70, left: 44},
    {top: 60, left: 83.5},
    {top: 15, left: 83.5},
    {top: 3, left: 44}];

  constructor(private socket: Socket) {
  }

  ngOnInit() {
    this.socket.on('gameDataUpdated', (data) => {
      this.updateGame(data);
    });
  }

  updateGame(data) {
    this.data = data.data;

    if (this.data.commonCards.length >= 1) {
      this.commonCards.push(this.data.commonCards);
      console.log(this.commonCards);
    }

    this.players = data.data.players;
  }

  getPlayerStyle(player) {
    const styles = {
      'position': 'absolute',
      'text-align': 'center',
      'top': `${this.playerPos[player]['top']}%`,
      'left': `${this.playerPos[player]['left']}%`,
      'transform': `translate (-${this.playerPos[player]['left']}%, -${this.playerPos[player]['top']}%)`
    };
    return styles;
  }

}
