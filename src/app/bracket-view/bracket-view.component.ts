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
    this.tournamentService.getBracket(this.bracketId).subscribe((bracket) => {
      this.bracket = bracket;
      this.selectedDiv = this.bracket.divisions[0];
      this.bracketLoaded = true;
    });
  }

}