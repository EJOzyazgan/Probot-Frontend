import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class BotService {
  botUrl = environment.apiUrl + 'bot';

  constructor(private http: HttpClient) {
  }

 options = {
    headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.userTokenKey))
      .set('Content-Type', 'application/json')
  };

  getBotByUser() {
    return this.http.get(this.botUrl + '/' +  localStorage.getItem(environment.userIdKey), this.options);
  }

  create(bot) {
    return this.http.post(this.botUrl + '/create', bot, this.options);
  }

  patchBot(bot) {
    return this.http.patch(this.botUrl + '/patch/' + bot.id, bot, this.options);
  }
}
