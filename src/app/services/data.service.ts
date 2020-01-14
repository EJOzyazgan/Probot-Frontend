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

  private gameData = new BehaviorSubject(null);
  currentGameData = this.gameData.asObservable();

  constructor() {
  }

  changeEmail(email: string) {
    this.email.next((email));
  }

  changeBracket(bracketId: number) {
    this.bracketId.next(bracketId);
  }

  changeTournament(tournamentId: string) {
    this.tournamentId.next(tournamentId);
  }

  changeDiv(divId: number) {
    this.divId.next(divId);
  }

  changeRound(roundId: number) {
    this.roundId.next(roundId);
  }

  changeMatch(matchId: number) {
    this.matchId.next(matchId);
  }

  changeGameData(gameData: Array<JSON>) {
    this.gameData.next(gameData);
  }

}
