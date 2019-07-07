import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TableService {
  tableUrl = environment.apiUrl + 'table';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.userTokenKey))
      .set('Content-Type', 'application/json')
  };

  startSandboxTable(body) {
    return this.http.post(this.tableUrl + '/start/sandbox', body, this.options);
  }
}
