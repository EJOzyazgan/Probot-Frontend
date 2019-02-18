import {Component, OnInit, isDevMode} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {CardGroup, OddsCalculator} from 'poker-odds-calculator';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {
  players = [];
  player;
  commonCards = [];
  data;
  message;
  session;
  smallBlind;
  pot = 0;
  odds = [];

  playerPos = [{top: 15, left: 10},
    {top: 60, left: 10},
    {top: 70, left: 45},
    {top: 60, left: 80},
    {top: 15, left: 80},
    {top: 5, left: 45}];

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
    this.players = data.data.players;
    this.player = this.getPlayer(this.players, this.data.playerId);
    this.session = this.data.session;

    for (const card of this.data.commonCards) {
      if (this.commonCards.length === 5) {
        this.commonCards = [];
      }
      this.commonCards.push(card);
    }

    if (this.data.type === 'setup') {
      this.message = `Starting hand ${this.data.handId} of game ${this.data.gameId}`;
      this.smallBlind = this.data.sb;
      this.pot = this.data.pot;
      this.odds = this.getOdds(this.players, this.commonCards);
    } else if (this.data.type === 'status') {
      if (this.data.status === 'folded') {
        this.message = `${this.player.name} Has Folded`;
      } else {
        this.message = `${this.player.name} Is Out`;
      }
    } else if (this.data.type === 'bet') {
      this.message = `${this.player.name} Bet ${this.data.amount}`;
      this.pot += this.data.amount;
    } else if (this.data.type === 'cards') {
      this.message = `${this.data.session} Card(s): ${this.getCards(this.data.commonCards)}`;
      this.odds = this.getOdds(this.players, this.commonCards);
    } else if (this.data.type === 'win') {
      this.player = this.getPlayer(this.players, this.data.winners[0].id);
      this.message = `${this.player.name} is the Winner!!!`;
      this.commonCards = [];
      this.pot = 0;
    } else {
      this.message = `Starting hand ${this.data.handId} of game ${this.data.gameId}`;
    }
  }

  getOdds(players, commonCards) {
    const hands = [];
    const board = CardGroup.fromString(this.getCardString(commonCards));
    const odds = [];

    for (const player of players) {
      if (player.status === 'active') {
        hands.push(CardGroup.fromString(this.getCardString(player.cards)));
      }
    }

    let count = 0;
    const equity = OddsCalculator.calculate(hands, board);

    for (const player of players) {
      if (player.status === 'active') {
        odds.push(equity.equities[count].getEquity());
        count++;
      } else {
        odds.push(0);
      }
    }

    return odds;
  }

  getCardString(cards) {
    let cardString = '';
    for (const card of cards) {
      if (card.rank === '10') {
        cardString += ('T' + card.type.toLowerCase());
      } else {
        cardString += (card.rank + card.type.toLowerCase());
      }
    }
    return cardString;
  }

  getCards(cards) {
    const cardString = [];
    for (const card of cards) {
      cardString.push(card.rank + card.type.toLowerCase());
    }
    return cardString;
  }

  getPlayer(players, id) {
    for (const player of players) {
      if (player.id === id) {
        return player;
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
