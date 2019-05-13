import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})

export class PlatformComponent implements OnInit {

  userName = 'Probot Play';
  showLogout = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
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
