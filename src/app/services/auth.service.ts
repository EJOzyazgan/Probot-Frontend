import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  authUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders().set('auth', localStorage.getItem('token'))
  };

  signUp(user) {
    return this.http.post(this.authUrl + '/create', user);
  }

  login(email, password) {
    return this.http.post(this.authUrl + '/login', {email: email, password: password});
  }

  checkExists(email) {
    console.log(this.authUrl);
    return this.http.post(this.authUrl + '/exists', {email: email});
  }

  getByToken(token) {
    return this.http.post(this.authUrl + '/get/token', {token: token}, this.options);
  }

  resetPasswordEmail(email) {
    return this.http.post(this.authUrl + '/forgot', {email: email});
  }
}
