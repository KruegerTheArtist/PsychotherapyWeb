import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApplicationStateService } from './application-state.service';
import { UserShort } from '../model/user-short.model';
import { TokenResponse } from '../model/token-response.model';

@Injectable({ providedIn: 'root' })
export class ApplicationEventService {

    constructor(private appState: ApplicationStateService) {

    }

    private tokenSubject = new Subject<TokenResponse>();
    sendTokenEvent(token: TokenResponse) {
        if (token.success) {
            this.appState.setUser(new UserShort({ login: token.login }));
        }
        this.tokenSubject.next(token);
    }

    listenTokenEvent(): Observable<TokenResponse> {
        return this.tokenSubject.asObservable();
    }

    private errorSubject = new Subject<any>();
    sendErrorEvent(error: any) {
        this.errorSubject.next(error);
    }

    listenErrorEvent(): Observable<any> {
        return this.errorSubject.asObservable();
    }
}