import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../services/tournament.service';
import {Tournament} from '../models/tournament.model';
import {Bracket} from '../models/bracket.model';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss']
})
export class TournamentManagerComponent implements OnInit {
  tournaments;
  tournament = new Tournament();
  brackets;
  bracket = new Bracket();
  match = null;
  round = null;
  division = null;

  newTournament = false;
  newBracket = false;

  constructor(private tournamentService: TournamentService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.getTournaments();
  }

  createTournament() {
    this.tournamentService.createTournament(this.tournament).subscribe((tournament) => {
      this.tournament = tournament['tournament'];
      this.toggle('tournament');
      this.getTournaments();
    });
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe((tournaments) => {
      this.tournaments = tournaments['tournaments'];
    });
  }

  getBrackets(tournamentId) {
    this.tournamentService.getBrackets(tournamentId).subscribe((brackets) => {
      this.brackets = brackets;
    });
  }

  createBracket() {
    this.bracket.tournamentId = this.tournament.id;
    this.tournamentService.createBracket(this.bracket).subscribe((bracket) => {
      this.bracket = bracket['bracket'];
      this.toggle('bracket');
      this.getBrackets(this.tournament.id);
    });
  }

  viewBracket() {
    console.log(this.bracket.id);
    this.dataService.changeBracket(this.bracket.id);
  }

  startGame() {
    const gameData = {
      tournament: this.tournament,
      division: this.division,
      round: this.round,
      match: this.match
    };

    const tournamentId = '' + this.tournament.id + '-' + this.division.name + this.round.name + this.match.name;

    this.dataService.changeTournament(tournamentId);
    this.dataService.changeBracket(this.bracket.id);
    this.dataService.changeDiv(this.division.name);
    this.dataService.changeRound(this.round.name);
    this.dataService.changeMatch(this.match.name);

    this.tournamentService.startGame(gameData).subscribe((game) => {

    });
  }

  toggle(view) {
    if (view === 'tournament') {
      this.tournament = new Tournament();
      this.newTournament = !this.newTournament;
    } else if (view === 'bracket') {
      this.bracket = new Bracket();
      this.newBracket = !this.newBracket;
    }
  }
}
