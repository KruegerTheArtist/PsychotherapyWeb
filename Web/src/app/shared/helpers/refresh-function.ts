import { Observable, Subject } from 'rxjs';

export function refreshToken(auth: AuthService) {
    return () => {
        // return own subject to complete this initialization step in any case
        // otherwise app will stay on preloader if any error while token refreshing occurred
        const subj = new Subject();
        auth.renewAuth()
        .finally(() => {
            subj.complete();
        })
        .catch((err, caught: Observable<any>) => {
            // do logout, redirect to login will occurs at UserService with onLoggedOut event
            auth.logout();
            return ErrorObservable.create(err);
        })
        .subscribe();
        // need to return Promise!!
        return subj.toPromise();
    };
  }