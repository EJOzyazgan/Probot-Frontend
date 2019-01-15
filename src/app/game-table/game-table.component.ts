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

    this.socket.on('gameOver', (data) => {
      this.resetGame(data);
    });
  }

  updateGame(data) {
    this.data = data.data;

    if (this.data.type !== 'status') {
      for (const card of this.data.commonCards) {
        this.commonCards.push(card);
      }

      this.players = data.data.players;
      console.log(this.data.handId, this.players);
      if (this.data.type === 'bet') {
        this.pot += this.data.amount;
      } else if (this.data.type === 'win') {
        this.commonCards = [];
        this.pot = 0;
      }
    }
  }

  resetGame(data) {
    this.commonCards = [];
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
