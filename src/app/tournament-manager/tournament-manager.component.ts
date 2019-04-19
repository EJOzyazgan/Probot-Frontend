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
  game = null;
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
    console.log(this.tournament);
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
    this.bracket.tournamentId = this.tournament._id;
    this.tournamentService.createBracket(this.bracket).subscribe((bracket) => {
      this.bracket = bracket['bracket'];
      this.toggle('bracket');
      this.getBrackets(this.tournament._id);
    });
  }

  viewBracket() {
    console.log(this.bracket._id);
    this.dataService.changeBracket(this.bracket._id);
  }

  startGame() {
    const gameData = {
      tournament: this.tournament,
      division: this.division,
      round: this.round,
      game: this.game
    };

    const tournamentId = '' + this.tournament._id + '-' + this.division.name + this.round.name + this.game.name;

    console.log(tournamentId);
    this.dataService.changeTournament(tournamentId);

    // this.tournamentService.startGame(gameData).subscribe((game) => {
    //
    // });
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
