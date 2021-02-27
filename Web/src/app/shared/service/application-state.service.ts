import { Injectable } from '@angular/core';
import { UserShort } from '../model/user-short.model';

@Injectable({ providedIn: 'root' })
export class ApplicationStateService {
    private user = new UserShort();
    
    constructor() {

    }

    setUser(user: UserShort) {
        this.user = user;
    }

    getUser(): UserShort {
        return this.user;
    }

}