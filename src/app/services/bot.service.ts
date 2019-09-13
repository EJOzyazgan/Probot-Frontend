import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class BotService {
  botUrl = environment.apiUrl + 'bot';

  constructor(private http: HttpClient) {
  }

  getByUser() {
    return this.http.get(this.botUrl + '/get/user');
  }

  getAdmin() {
    return this.http.get(this.botUrl + '/get/admin');
  }

  create(bot) {
    return this.http.post(this.botUrl + '/create', bot);
  }

  patchBot(bot) {
    return this.http.patch(this.botUrl + '/patch/' + bot.id, bot);
  }

  getCleanData(body) {
    return this.http.post(this.botUrl + '/get/data/clean', body);
  }

  getData(body) {
    return this.http.post(this.botUrl + '/get/data', body);
  }

  getSessions(id) {
    return this.http.get(this.botUrl + `/get/sessions/${id}`);
  }
}
