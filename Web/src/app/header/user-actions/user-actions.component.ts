import { Component, OnInit } from '@angular/core';
import { UserShort } from 'src/app/shared/model/user-short.model';
import { ApplicationStateService } from 'src/app/shared/service/application-state.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html'
})
export class UserActionsComponent implements OnInit {
  public user = new UserShort();


  constructor(private appState: ApplicationStateService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.appState.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
