import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MetricService {
  metricUrl = environment.apiUrl + 'metric';

  constructor(private http: HttpClient) {
  }

  getMetrics(body) {
    return this.http.post(this.metricUrl + `/get/metric`, body);
  }

  getPlatformAnalytics() {
    return this.http.get(this.metricUrl + `/platform-analytics`);
  }

  getUserAnalytics() {
    return this.http.get(this.metricUrl + `/user-analytics`);
  }

  getTopPlayers() {
    return this.http.get(this.metricUrl + '/top-players');
  }

  getUserStanding() {
    return this.http.get(this.metricUrl + '/user-standing');
  }
}
