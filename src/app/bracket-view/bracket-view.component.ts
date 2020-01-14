import {Component, OnInit} from '@angular/core';
import {Bracket} from '../models/bracket.model';
import {TournamentService} from '../services/tournament.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-bracket-view',
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.scss']
})
export class BracketViewComponent implements OnInit {
  bracket = new Bracket();
  bracketId;
  selectedDiv;
  bracketLoaded = false;

  constructor(private tournamentService: TournamentService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.currentBracket.subscribe(bracketId => {
      this.bracketId = bracketId;
      this.getBracket();
    });
  }

  getBracket() {
    this.tournamentService.getBracket(13).subscribe((bracket) => {
      this.bracket = bracket;
      this.selectedDiv = this.bracket.divisions[0];
      this.bracketLoaded = true;
    });
  }

  isWinner(id, winners) {
    return winners.includes(id);
  }

  checkBots(match, num) {
    return match.bots.length > num;
  }

  numArray(amount) {
    return Array(amount);
  }

  botCardStyle(match, num) {
    if (!this.checkBots(match, num)) {
      return {
        'background': '#5c5858',
        'opacity': '0.75',
      };
    } else if (this.isWinner(match.bots[num].bot.id, match.winners)) {
      return {
        'background': '#cc0000',
        'color': 'white',
      };
    }
  }

}
