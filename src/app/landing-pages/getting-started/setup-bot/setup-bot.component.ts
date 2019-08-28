import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-setup-bot',
  templateUrl: './setup-bot.component.html',
  styleUrls: ['../getting-started.component.scss']
})
export class SetupBotComponent implements OnInit {

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit() {
  }

  SendRepoEvent(type) {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('Repository', 'click', type, 1);
  }

}
