import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Config } from '../model/config.model';
import { TokenResponse } from '../model/token-response.model';

import { UserShort } from '../model/user-short.model';
import { User } from '../model/user.model';
import { ApplicationEventService } from './application-event.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = '';
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser = new User();
    private settings = new Config();

    constructor(private http: HttpService, private appEvent: ApplicationEventService, private configService: ConfigService) {
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
        this.init();
    }

    async init() {
        this.settings = await this.configService.getSettings()
        this.headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    }


    async refreshToken(login: string, refreshToken: string) {
        return await this.http.postWithModel(this.settings.api + '/Auth/Refresh', { login, refreshToken }, this.headers).toPromise();
    }

    async register(user: UserShort) {
        this.http.postWithModel(this.settings.api + '/Auth/Register', user).toPromise().then(x => {
            localStorage.setItem('access_token', x.accessToken);
            this.currentUser.login = x.login;
            this.currentUser.refreshToken = x.refreshToken;
            this.appEvent.sendTokenEvent(x);
        })

    }


    async login(user: UserShort) {
        this.http.postWithModel(this.settings.api + '/Auth/Authorize', user).toPromise().then(x => {
            localStorage.setItem('access_token', x.accessToken);
            this.currentUser.login = x.login;
            this.currentUser.refreshToken = x.refreshToken;
            this.appEvent.sendTokenEvent(x);
        })

    }


    async logout() {
        this.http.get<TokenResponse>(this.settings.api + '/Auth/Logout', this.headers).toPromise().then(x => {
            localStorage.clear();
            this.appEvent.sendTokenEvent(new TokenResponse());
        })
    }

    private getToken() {
        return localStorage.getItem('access_token');
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