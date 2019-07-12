import {Component, OnInit} from '@angular/core';
import {TableService} from '../../services/table.service';
import {AlertService} from 'ngx-alerts';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  user = new User();
  buyin;

  constructor(private authService: AuthService,
              private tableService: TableService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  startSandBox() {
    if (this.user.bots[0] !== null) {
      const body = {
        bot: this.user.bots[0]
      };
      this.tableService.startSandboxTable(body).subscribe(res => {
        this.alertService.success(res['msg']);
      }, error => {
        this.alertService.danger(error.error.msg);
      });
    }
  }

  startPVP() {
    if (this.buyin) {
      if (this.buyin > this.user.chips) {
        return this.alertService.warning('Not enough chips');
      }

      const body = {
        bot: this.user.bots[0],
        buyin: this.buyin
      };

      this.tableService.joinTable(body).subscribe(res => {
        this.alertService.success(res['msg']);
      }, error => {
        this.alertService.danger(error.error.msg);
      });
    } else {
      this.alertService.warning('Please Select Buy In');
    }

  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
