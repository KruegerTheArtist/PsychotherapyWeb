import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Config } from '../model/config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient) {
    }


    getSettings(): Promise<Config> {
        return this.http.get<Config>("./assets/settings.json").toPromise();
    }
}