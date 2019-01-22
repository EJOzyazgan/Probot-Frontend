import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  menuActive = false;
  user = new User(null);
  userRetrieved = false;
  dropdown = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = new User(null);
    this.userService.get()
      .subscribe(user => {
        this.user = user;
        this.userRetrieved = true;
      }, error => {
        console.log(error);
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  styleMenu() {
    if (this.menuActive) {
      return {'transform': 'rotate(0)', 'right': '25px'};
    }
  }

}
