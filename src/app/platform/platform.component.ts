import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})

export class PlatformComponent implements OnInit {
  showLogout = false;

  user = new User();

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  toggle(view) {
    if (view === 'logout') {
      this.showLogout = !this.showLogout;
    }
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['/auth']);
  }

}
