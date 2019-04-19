import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(null);
  currentBracket = this.messageSource.asObservable();

  private tournamentId = new BehaviorSubject(null);
  currentTournamentId = this.tournamentId.asObservable();

  constructor() {
  }

  changeBracket(bracketId: string) {
    this.messageSource.next(bracketId);
  }

  changeTournament(tournamentId: string) {
    this.tournamentId.next(tournamentId);
  }

}
