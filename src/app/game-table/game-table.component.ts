import { Component, OnInit, isDevMode, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CardGroup, OddsCalculator } from 'poker-odds-calculator';
import { DataService } from '../services/data.service';
import { TournamentService } from '../services/tournament.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import * as SafeDemo from '../../assets/safe-demo.json';
import * as PassiveDemo from '../../assets/passive-demo.json';
import * as AgressiveDemo from '../../assets/aggresive-demo.json';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  @Input() demo;
  @Input() botName;
  @Input() botType;

  players = [{ name: 'Demo Bot', cards: { rank: 3, type: 'K' } },
  { name: 'Demo Bot', cards: { rank: 3, type: 'K' } },
  { name: 'Demo Bot', cards: { rank: 3, type: 'K' } },
  { name: 'Demo Bot', cards: { rank: 3, type: 'K' } },
  { name: 'Demo Bot', cards: { rank: 3, type: 'K' } },
  { name: 'Demo Bot', cards: { rank: 3, type: 'K' } }];
  player;
  commonCards = [];
  data;
  message = '';
  session;
  smallBlind;
  pot = 0;
  odds = [10, 10, 10, 10, 10, 10];

  playerPos = [{ top: 15, left: 10 }, // top left
    { top: 65, left: 10 }, // bottom left
    { top: 70, left: 45 }, // bottom middle
    { top: 65, left: 80 }, // bottom right
    { top: 15, left: 80 }, // top right
    { top: 8, left: 50 }]; // top middle

  tournamentId;
  bracketId;
  bracket;
  div;
  round;
  match;

  gameData;
  currentDataIndex = 0;

  dataLoaded = true;

  timerId;
  playRate;

  demoData = [SafeDemo, PassiveDemo, AgressiveDemo];

  screenWidth;

  constructor(private socket: Socket,
    private dataService: DataService,
    private tournamentService: TournamentService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    // this.socket.on('gameDataUpdated', (data) => {
    //   this.updateGame(data);
    // });

    // this.socket.on('gameOver', (data) => {
    //   this.resetGame(data);
    // });

    // this.socket.on('test', (data) => {
    //   console.log(data.data);
    // });

    // this.socket.on('connect', (data) => {
    //   this.dataService.currentTournamentId.subscribe(tournamentId => {
    //     this.tournamentId = tournamentId;
    //     this.socket.emit('room', this.tournamentId);
    //   });
    // });

    // this.dataService.currentBracket.subscribe(bracketId => {
    //   this.bracketId = bracketId;
    //   this.tournamentService.getBracket(this.bracketId).subscribe(bracket => {
    //     this.bracket = bracket;
    //     console.log('bracket', this.bracket);
    //   });
    // });

    // this.dataService.currentDivId.subscribe(divId => {
    //   this.div = divId;
    //   console.log('div', this.div);
    // });

    // this.dataService.currentRoundId.subscribe(roundId => {
    //   this.round = roundId;
    //   console.log('round', this.round);
    // });

    // this.dataService.currentMatchId.subscribe(matchId => {
    //   this.match = matchId;
    //   console.log('match', this.match);
    // });

    this.screenWidth = window.innerWidth;
    this.calcPlayerPos();

    if (!this.demo) {
      this.dataService.currentGameData.subscribe(gameData => {
        this.gameData = gameData;
        if (!this.gameData || this.gameData.length < 1) {
          this.alertService.warning('No data found');
          return this.router.navigate(['./platform/lobby']);
        }
        this.updateGame(this.gameData[this.currentDataIndex]);
      });
    }

    clearInterval(this.timerId);
  }

  calcPlayerPos() {
    if (this.screenWidth < 425) {
      this.playerPos = [{ top: 20, left: 5 }, // top left
      { top: 60, left: 5 }, // bottom left
      { top: 60, left: 50 }, // bottom middle
      { top: 60, left: 70 }, // bottom right
      { top: 20, left: 70 }, // top right
      { top: 20, left: 50 }]; // top middle
    } else if (this.screenWidth < 875) {
      this.playerPos = [{ top: 20, left: 12 }, // top left
      { top: 60, left: 12 }, // bottom left
      { top: 60, left: 45 }, // bottom middle
      { top: 60, left: 75 }, // bottom right
      { top: 20, left: 75 }, // top right
      { top: 18, left: 50 }]; // top middle
    } else if(this.screenWidth < 1050) {
      this.playerPos = [{ top: 15, left: 10 }, // top left
        { top: 60, left: 10 }, // bottom left
        { top: 65, left: 45 }, // bottom middle
        { top: 60, left: 78 }, // bottom right
        { top: 15, left: 78 }, // top right
        { top: 8, left: 50 }]; // top middle
    }
  }

  startDemo() {
    this.currentDataIndex = 0;
    this.gameData = this.demoData[parseInt(this.botType)]['default'];
    this.updateGame(this.gameData[this.currentDataIndex]);
    this.autoPlay(1000);
  }

  updateGame(data) {
    this.data = data;
    this.players = data.players;
    this.player = this.getPlayer(this.players, this.data.playerId);
    this.session = this.data.session;

    if (this.data.commonCards) {
      for (const card of this.data.commonCards) {
        if (this.commonCards.length === 5) {
          this.commonCards = [];
        }
        this.commonCards.push(card);
      }
    }

    if (this.data.pot) {
      this.pot = this.data.pot;
    }

    if (this.data.type === 'setup') {
      this.message = `Starting hand ${this.data.handId} of game ${this.data.gameId}`;
      this.smallBlind = this.data.sb;
      this.pot = this.data.pot;
      // this.odds = this.getOdds(this.players, this.commonCards);
    } else if (this.data.type === 'status') {
      if (this.data.status === 'folded') {
        this.message = `${this.player.name} Has Folded`;
      } else {
        this.message = `${this.player.name} Is Out`;
      }
      // this.odds = this.getOdds(this.players, this.commonCards);
    } else if (this.data.type === 'bet') {
      this.message = `${this.player.name} Bet ${this.data.amount.toFixed(2)}`;
      this.pot = this.data.pot;
    } else if (this.data.type === 'cards') {
      this.message = `${this.data.session} Card(s): ${this.getCards(this.data.commonCards)}`;
      // this.odds = this.getOdds(this.players, this.commonCards);
    } else if (this.data.type === 'win') {
      this.player = this.getPlayer(this.players, this.data.winners[0].id);
      this.message = `${this.player.name} is the Winner!!!`;
      this.commonCards = [];
      this.pot = 0;
    } else {
      this.message = `Starting hand ${this.data.handId} of game ${this.data.gameId}`;
    }
  }

  autoPlay(speed) {
    clearInterval(this.timerId);
    this.playRate = speed;
    this.timerId = setInterval(() => this.nextData(1), speed);
  }

  stopAutoPlay() {
    clearInterval(this.timerId);
    this.playRate = null;
  }

  getOdds(players, commonCards) {
    this.dataLoaded = false;
    const hands = [];
    const board = CardGroup.fromString(this.getCardString(commonCards));
    const odds = [];

    for (const player of players) {
      if (player.status === 'active') {
        hands.push(CardGroup.fromString(this.getCardString(player.cards)));
      }
    }

    if (commonCards.length > 2) {
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
    } else {
      for (const player of players) {
        odds.push(0);
      }
    }

    this.dataLoaded = true;
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
    this.dataLoaded = false;
    const cardString = [];
    for (const card of cards) {
      cardString.push(card.rank + card.type.toLowerCase());
    }
    this.dataLoaded = true;
    return cardString;
  }

  getPlayer(players, id) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == id) {
        if (this.demo && i === 5) {
          players[i].name = this.botName;
        }
        return players[i];
      }
    }
  }

  resetGame(data) {
    this.commonCards = [];

    const topTwo = [];

    for (const bot of this.bracket.divisions[this.div].rounds[this.round].matches[this.match].bots) {
      for (const botRank of data.data.rank) {
        if (bot.bot.name === botRank.name) {
          bot.score += botRank.pts;
        }
      }
    }

    if (data.data.gameId === 3) {
      let firstMax = '';
      while (topTwo.length < 2) {
        let max = this.deepCopy(this.bracket.divisions[this.div].rounds[this.round].matches[this.match].bots[0]);
        for (const bot of this.bracket.divisions[this.div].rounds[this.round].matches[this.match].bots) {
          if (bot.score >= max.score && bot.bot.name !== firstMax) {
            max = this.deepCopy(bot);
          }
        }
        firstMax = max.bot.name;
        max.score = 0;
        topTwo.push(max);
      }

      if (this.round + 1 < this.bracket.divisions[this.div].rounds.length) {
        if (this.match < 2) {
          Array.prototype.push.apply(this.bracket.divisions[this.div].rounds[this.round + 1].matches[0].bots, topTwo);
        } else {
          Array.prototype.push.apply(this.bracket.divisions[this.div].rounds[this.round + 1].matches[1].bots, topTwo);
        }
      }
    }

    this.tournamentService.updateBracket(this.bracket).subscribe(newBracket => {
      this.bracket = newBracket['bracket'];
      // console.log(this.bracket);
    });

  }

  deepCopy(bot) {
    const target = {
      bot: null,
      score: 0,
      status: 'play'
    };

    for (const prop in bot) {
      if (bot.hasOwnProperty(prop)) {
        target[prop] = bot[prop];
      }
    }
    return target;
  }

  alreadySelected(bot, topTwo) {
    for (const b of topTwo) {
      if (b.bot.name === bot.bot.name) {
        return true;
      }
    }
    return false;
  }

  getPlayerStyle(player) {
    let style = {};

    if (player === 2 || player === 5) {
      style = {
        'position': 'absolute',
        'text-align': 'center',
        'top': `${this.playerPos[player]['top']}%`,
        'left': '0',
        'right': '0',
        'margin': 'auto'
      };
    } else {
      style = {
        'position': 'absolute',
        'text-align': 'center',
        'top': `${this.playerPos[player]['top']}%`,
        'left': `${this.playerPos[player]['left']}%`
      };
    }
    return style;
  }

  getDemoStyle(player) {
    let style = {};

    if (this.demo && player === 5) {
      style = {
        'color': '#cc0000',
      }
    }

    return style;
  }

  nextData(direction) {
    if (this.currentDataIndex + direction > this.gameData.length - 1) {
      this.currentDataIndex = 0;
    } else if (this.currentDataIndex + direction < 0) {
      this.currentDataIndex = this.gameData.length - 1;
    } else {
      this.currentDataIndex += direction;
    }
    this.updateGame(this.gameData[this.currentDataIndex]);
  }

}
