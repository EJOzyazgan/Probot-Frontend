import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  purchaseUrl = environment.apiUrl + 'purchase';

  constructor(private http: HttpClient) { }

  save(body) {
    return this.http.post(`${this.purchaseUrl}/save`, body);
  }
}
