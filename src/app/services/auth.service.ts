import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  authUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

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
    const options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    };

    return this.http.get(this.authUrl + `/validate/reset-password/${token}`, options);
  }

  validateEmail(token) {
    return this.http.get(this.authUrl + `/validate/token/${token}`);
  }

  acceptFriendRequest(userReferral, friendReferral) {
    return this.http.get(this.authUrl + `/accept/friend-request/${userReferral}/${friendReferral}`);
  }

  getUser() {
    return this.http.get(this.authUrl + '/get');
  }

  sendReferralEmail(email) {
    return this.http.get(this.authUrl + `/referral/${email}`);
  }

  addFriend(email) {
    return this.http.get(this.authUrl + `/add/friend/${email}`);
  }

  getFriends(friends) {
    return this.http.post(this.authUrl + '/get/friends', friends);
  }

  patchUser(user) {
    return this.http.patch(this.authUrl + '/patch', user);
  }

  setTokens(tokens) {
    localStorage.setItem(environment.userTokenKey, tokens.token);
    localStorage.setItem(environment.userTokenExpire, tokens.expiresAt);
    localStorage.setItem(environment.userRefreshToken, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(environment.userTokenKey);
    localStorage.removeItem(environment.userTokenExpire);
    localStorage.removeItem(environment.userRefreshToken);
  }

  getJwtToken() {
    return localStorage.getItem(environment.userTokenKey);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(environment.userRefreshToken);
    return this.http.get(this.authUrl + `/refresh-token/${refreshToken}`)
      .pipe(tap(tokens => {
        this.setTokens(tokens);
      }));
  }

  isLoggedIn() {
    if (localStorage.getItem(environment.userTokenKey)) {
      return true;
    }
    this.removeTokens();
    return false;
  }
}
