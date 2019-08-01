import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  authUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.userTokenKey))
      .set('Content-Type', 'application/json')
  };

  signUp(user) {
    return this.http.post(this.authUrl + '/create', user);
  }

  login(email, password) {
    return this.http.post(this.authUrl + '/login', {email: email, password: password});
  }

  checkExists(email, username) {
    return this.http.post(this.authUrl + '/exists', {email: email, username: username});
  }

  resetPassword(email) {
    return this.http.get(this.authUrl + `/reset-password/${email}`);
  }

  validateResetPassword(token) {
    this.options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    };

    return this.http.get(this.authUrl + `/validate/reset-password/${token}`, this.options);
  }

  validateEmail(token) {
    return this.http.get(this.authUrl + `/validate/token/${token}`);
  }

  acceptFriendRequest(userReferral, friendReferral) {
    return this.http.get(this.authUrl + `/accept/friend-request/${userReferral}/${friendReferral}`);
  }

  getUser() {
    return this.http.get(this.authUrl + '/get', this.options);
  }

  sendReferralEmail(email) {
    return this.http.get(this.authUrl + `/referral/${email}`, this.options);
  }

  addFriend(email) {
    return this.http.get(this.authUrl + `/add/friend/${email}`, this.options);
  }

  getFriends(friends) {
    return this.http.post(this.authUrl + '/get/friends', friends, this.options);
  }

  patchUser(user) {
    return this.http.patch(this.authUrl + '/patch', user, this.options);
  }

  isLoggedIn() {
    if (localStorage.getItem(environment.userTokenExpire) && moment().isBefore(localStorage.getItem(environment.userTokenExpire))) {
      return true;
    }
    localStorage.removeItem(environment.userTokenKey);
    localStorage.removeItem(environment.userTokenExpire);
    return false;
  }
}
