import { Component, OnInit } from '@angular/core';
import { ApplicationEventService } from 'src/app/shared/service/application-event.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(private appEvent: ApplicationEventService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  clear() {
    this.appEvent.sendTokenEvent({ accessToken: '', errorMessage: '', login: '', refreshToken: '', success: false });
  }
}
