import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from '../model/user.model';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = '';
    constructor(private http: HttpClient) {

    }

    register(user: User) {
        return this.http.post('https://localhost:44336/api/User', user);
    }

    login(user: User): Observable<any> {
        return this.http.post<any>('https://localhost:44336/api/User', user)
            .pipe(
                tap((token: string) => {
                    localStorage.setItem('auth-token', token);
                    this.setToken(token);
                })
            );

    }

    deleteUser(id: string) {

    }

    updateUser(id: string) {

    }

    getUserById(id: string) {

    }

    getUserByLogin(login: string) {

    }

    setToken(token: string) {

    }
}