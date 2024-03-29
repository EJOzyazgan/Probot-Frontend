import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AlertService} from 'ngx-alerts';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.alertService.warning('You must be logged in to access this page');
      return this.router.navigate(['auth/login']);
    }
  }
}
