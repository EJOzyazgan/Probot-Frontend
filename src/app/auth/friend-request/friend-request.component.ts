import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['../auth.scss']
})
export class FriendRequestComponent implements OnInit {
  userReferral;
  friendReferral;

  accepted = false;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userReferral = this.route.snapshot.paramMap.get('userReferral');
    this.friendReferral = this.route.snapshot.paramMap.get('friendReferral');

    this.acceptRequest();
  }

  acceptRequest() {
    if (this.userReferral && this.friendReferral) {
      this.authService.acceptFriendRequest(this.userReferral, this.friendReferral).subscribe(accepted => {
        this.accepted = true;
      }, err => {
      });
    }
  }
}
