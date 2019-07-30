import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MetricService {
  metricUrl = environment.apiUrl + 'metric';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.userTokenKey))
      .set('Content-Type', 'application/json')
  };

  getMetrics(body) {
    return this.http.post(this.metricUrl + `/get/metric`, body, this.options);
  }

  getPlatformAnalytics() {
    return this.http.get(this.metricUrl + `/platform-analytics`, this.options);
  }

  getUserAnalytics() {
    return this.http.get(this.metricUrl + `/user-analytics`, this.options);
  }
}
