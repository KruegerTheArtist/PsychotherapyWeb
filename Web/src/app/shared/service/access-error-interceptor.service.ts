import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationEventService } from './application-event.service';

@Injectable()
export class AccessErrorInterceptor implements HttpInterceptor {
    constructor(private appState: ApplicationEventService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                console.log('401 unauthorized error');
                this.appState.sendErrorEvent(err.status);
                return throwError(err);
            } else if (err.status === 403) {
                console.log('403 forbidden error');
                this.appState.sendErrorEvent(err.status);
                return throwError(err);
            } else if (err.status === 404) {
                console.log('404 not found');
                this.appState.sendErrorEvent(err.status);
                return throwError(err);
            } else {
                return throwError(err);
            }
        }));
    }
}

