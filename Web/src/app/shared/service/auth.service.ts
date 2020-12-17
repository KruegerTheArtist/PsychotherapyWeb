import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from '../model/user.model';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { UserShort } from '../model/user-short.model';


export interface TokenResponse {
    accessToken: string,
    login: string,
    refreshToken: string,
    success: boolean,
    errorMessage: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = '';
    constructor(private http: HttpClient) {

    }

    // register(user: User) {
    //     return this.http.post('https://localhost:44336/api/User', user);
    // }

    register(user: UserShort): Observable<TokenResponse> {
        return this.http.post<TokenResponse>('https://localhost:44336/api/Auth/Register', user);
    }


    login(user: UserShort): Promise<TokenResponse> {
        console.log(user, this.http.post<any>('https://localhost:44336/api/Auth/Authorize', user).toPromise().then(x => {
            console.log(x);

        }));

        return this.http.post<TokenResponse>('https://localhost:44336/api/Auth/Authorize', user).toPromise();

    }

    // login(user: User): Observable<any> {
    //     return this.http.post<any>('https://localhost:44336/api/User', user)
    //         .pipe(
    //             tap((token: string) => {
    //                 localStorage.setItem('auth-token', token);
    //                 this.setToken(token);
    //             })
    //         );

    // }

    deleteUser(id: string) {

    }

    updateUser(id: string) {

    }

    getUserById(id: string) {

    }

    getUserByLogin(login: string) {

    }

    setToken(token: string) {
        this.token = token;
    }
}