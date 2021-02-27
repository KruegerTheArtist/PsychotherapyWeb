
import { Component } from '@angular/core';
import { ApplicationEventService } from './shared/service/application-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authorize = false;
  constructor(public appEvent: ApplicationEventService) {

    appEvent.listenTokenEvent().subscribe(data => {
      this.authorize = data.success;
    })

  }
}
