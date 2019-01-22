import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AlertService} from 'ngx-alerts';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private alertService: AlertService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      this.alertService.warning('You must be logged in to access this page');
      this.router.navigate(['auth/login']);
    }
  }
}
