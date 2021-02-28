import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TokenResponse } from '../model/token-response.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {
            }

    get<T>(url: string, header?: HttpHeaders) {
        return this.http.get<T>(url, { headers: header });;
    }

    postWithModel(url: string, model: any, header?: HttpHeaders) {
        return this.http.post<TokenResponse>(url, model, { headers: header });;
    }
}