import {Component, OnInit} from '@angular/core';
import {Bracket} from '../models/bracket.model';
import {TournamentService} from '../services/tournament.service';

@Component({
  selector: 'app-bracket-view',
  templateUrl: './bracket-view.component.html',
  styleUrls: ['./bracket-view.component.scss']
})
export class BracketViewComponent implements OnInit {
  bracket = new Bracket();
  selectedDiv;
  bracketLoaded = false;

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.getBracket();
  }

  getBracket() {
    this.tournamentService.getBracket('5c496c6116b7cb7c90b86c8e').subscribe((bracket) => {
      console.log(bracket);
      this.bracket = bracket;
      this.selectedDiv = this.bracket.divisions[0];
      this.bracketLoaded = true;
    });
  }

}
