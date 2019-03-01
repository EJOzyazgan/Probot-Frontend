import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Tournament} from '../models/tournament.model';
import {Bracket} from '../models/bracket.model';
import {browser} from 'protractor';

@Injectable()
export class TournamentService {
  tournamentUrl = environment.apiUrl + 'tournament';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders().set('auth', localStorage.getItem('token'))
  };

  getTournaments() {
    return this.http.get(this.tournamentUrl + '/all');
  }

  createTournament(tournament: Tournament) {
    return this.http.post(this.tournamentUrl + '/create', tournament);
  }

  getBrackets(tournamentId: string) {
    return this.http.post(this.tournamentUrl + '/bracket/get/all', {tournamentId: tournamentId});
  }

  getBracket(bracketId: string) {
    return this.http.post(this.tournamentUrl + '/bracket/get/:id', {bracketId: bracketId});
  }

  createBracket(bracket: Bracket) {
    return this.http.post(this.tournamentUrl + '/bracket/create', bracket);
  }

  startGame(gameData) {
    return this.http.post(this.tournamentUrl + '/start/game', gameData);
  }

}
