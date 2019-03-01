import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(null);
  currentBracket = this.messageSource.asObservable();

  constructor() { }

  changeBracket(bracketId: string) {
    this.messageSource.next(bracketId);
  }

}
