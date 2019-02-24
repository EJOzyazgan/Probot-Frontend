import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TournamentService {
  tournamentUrl = environment.apiUrl + 'tournament';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders().set('auth', localStorage.getItem('token'))
  };

  getBracket(tournamentId: string) {
    return this.http.post(this.tournamentUrl + '/bracket/get', {tournamentId: tournamentId});
  }
}
