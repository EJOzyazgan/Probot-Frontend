import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';


@Injectable()
export class UserService {
  userUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders().set('auth', localStorage.getItem('token'))
  };

  delete(user: User) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const userId = user.id ? ('/' + user.id) : '';
    return this.http.delete(this.userUrl + userId + token);
  }

  get() {
    const userId = localStorage.getItem('userId');
    return this.http.get(this.userUrl + '/get/' + userId, this.options);
  }

  getById(user: User) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const userId = user.id ? ('/' + user.id) : '';
    return this.http.get(this.userUrl + '/profile/one' + userId + token);
  }

  getActive() {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.userUrl + '/active' + token, {});
  }

  patch(user) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const userId = localStorage.getItem('userId');
    return this.http.patch(this.userUrl + '/' + userId + token, user);
  }

  patchUser(user: User) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const userId = user.id ? user.id : '';
    return this.http.patch(this.userUrl + '/edit' + '/' + userId + token, user);
  }

  post(user: User) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.userUrl + token, user);
  }
}
