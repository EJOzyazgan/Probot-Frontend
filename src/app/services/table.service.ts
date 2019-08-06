import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TableService {
  tableUrl = environment.apiUrl + 'table';

  constructor(private http: HttpClient) {
  }

  startSandboxTable(body) {
    return this.http.post(this.tableUrl + '/start/sandbox', body);
  }

  joinTable(body) {
    return this.http.post(this.tableUrl + '/join', body);
  }
}
