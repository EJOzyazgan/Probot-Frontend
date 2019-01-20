import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  authUrl = environment.authUrl;

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

  update(user) {
    return this.http.patch(this.authUrl + '/update', user, this.options);
  }

  checkExists(email) {
    console.log(this.authUrl);
    return this.http.post(this.authUrl + '/exists', {email: email});
  }

  get(id) {
    return this.http.post(this.authUrl + '/get', {userId: id}, this.options);
  }

  getUsers(id) {
    return this.http.post(this.authUrl + '/get/users', {userId: id}, this.options);
  }

  getByToken(token) {
    return this.http.post(this.authUrl + '/get/token', {token: token}, this.options);
  }

  resetPasswordEmail(email) {
    return this.http.post(this.authUrl + '/forgot', {email: email});
  }
}
