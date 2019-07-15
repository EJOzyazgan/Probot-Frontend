import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {

  private bracketId = new BehaviorSubject(null);
  currentBracket = this.bracketId.asObservable();

  private tournamentId = new BehaviorSubject(null);
  currentTournamentId = this.tournamentId.asObservable();

  private divId = new BehaviorSubject(null);
  currentDivId = this.divId.asObservable();

  private roundId = new BehaviorSubject(null);
  currentRoundId = this.roundId.asObservable();

  private matchId = new BehaviorSubject(null);
  currentMatchId = this.matchId.asObservable();

  private email = new BehaviorSubject(null);
  currentEmail = this.email.asObservable();

  constructor() {
  }

  changeEmail(email: string) {
    this.email.next((email));
  }

  changeBracket(bracketId: string) {
    this.bracketId.next(bracketId);
  }

  changeTournament(tournamentId: string) {
    this.tournamentId.next(tournamentId);
  }

  changeDiv(divId: string) {
    this.divId.next(divId);
  }

  changeRound(roundId: string) {
    this.roundId.next(roundId);
  }

  changeMatch(matchId: string) {
    this.matchId.next(matchId);
  }

}
