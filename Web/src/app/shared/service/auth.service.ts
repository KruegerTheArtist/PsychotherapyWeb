import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs'
import { Config } from '../model/config.model';
import { TokenResponse } from '../model/token-response.model';

import { UserShort } from '../model/user-short.model';
import { User } from '../model/user.model';
import { ApplicationEventService } from './application-event.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = '';
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser = new User();
    private settings = new Config();

    constructor(private http: HttpService, private appEvent: ApplicationEventService) {
        appEvent.listenErrorEvent().subscribe(async x => {
            let response = await this.refreshToken(this.currentUser.login, this.currentUser.refreshToken);
            if (response.success) {
                localStorage.setItem('access_token', response.accessToken);
                this.appEvent.sendTokenEvent(response);
            } else {
                this.logout();
            }
        })
        appEvent.listenTokenEvent().subscribe(data => {
            if (data.accessToken) {
                this.token = data.accessToken
            } else {
                this.token = ''
            }
        })
    }


    async refreshToken(login: string, refreshToken: string) {
        const settings = await this.getSettings()
        const config = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
        return await this.http.postWithModel(settings.api + '/Auth/Refresh', { login, refreshToken }, config).toPromise();
    }

    async register(user: UserShort) {
        const settings = await this.getSettings()

        this.http.postWithModel(settings.api + '/Auth/Register', user).toPromise().then(x => {
            localStorage.setItem('access_token', x.accessToken);
            this.currentUser.login = x.login;
            this.currentUser.refreshToken = x.refreshToken;
            this.appEvent.sendTokenEvent(x);
        })

    }


    async login(user: UserShort) {
        const settings = await this.getSettings()

        this.http.postWithModel(settings.api + '/Auth/Authorize', user).toPromise().then(x => {
            localStorage.setItem('access_token', x.accessToken);
            this.currentUser.login = x.login;
            this.currentUser.refreshToken = x.refreshToken;
            this.appEvent.sendTokenEvent(x);
        })

    }


    async logout() {
        const settings = await this.getSettings()
        const config = new HttpHeaders({ Authorization: 'Bearer ' + this.token });

        this.http.get<TokenResponse>(settings.api + '/Auth/Logout', config).toPromise().then(x => {
            localStorage.clear();
            this.appEvent.sendTokenEvent(new TokenResponse());
        })
    }

    private getToken() {
        return localStorage.getItem('access_token');
    }

    private getSettings(): Promise<Config> {
        return this.http.get<Config>("./assets/settings.json").toPromise();
    }

    /* Пока что нужное*/
    // getUserProfile(id: string): Observable<any> {
    //     let api = `${this.settings.api}/user/${id}`;
    //     return this.http.get(api, this.headers).pipe(
    //         map((res: any) => {
    //             return res || {}
    //         }),
    //         catchError(this.handleError)
    //     )
    // }

    // handleError(error: HttpErrorResponse) {
    //     let msg = '';
    //     if (error.error instanceof ErrorEvent) {
    //         // client-side error
    //         msg = error.error.message;
    //     } else {
    //         // server-side error
    //         msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    //     }
    //     return throwError(msg);
    // }

    // get isLoggedIn(): boolean {
    //     let authToken = localStorage.getItem('access_token');
    //     return (authToken !== null) ? true : false;
    // }


}